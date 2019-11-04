import env from '../../../config/env';
import express from 'express';

import ApiResponse from '../../../app/api.response';
import User from '../../../models/user.model';

import exceptionHandler from '../../../helpers/general.exception.handler';

import errorTypes from '../../../app/types/errors';
import Guild from '../../../models/guild.model';

import bearerAuthenticationInterceptor from '../middleware/bearer.auth.interceptor';
import clientIdentificationInterceptor from '../middleware/client.identification.interceptor';

const router = express.Router({ mergeParams: true });

router.post('/register', clientIdentificationInterceptor, async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const { discordId, username } = request.body;
    if (!discordId) {
      apiResponse.addError({
        type: errorTypes.validations.required,
        message: 'Field `discordId` is required for guild identification',
        kind: 'validations.required'
      });

      return response.status(400).json(apiResponse.json());
    }

    if (!username) {
      apiResponse.addError({
        type: errorTypes.validations.required,
        message: 'Field `username` is required for guild identification',
        kind: 'validations.required'
      });

      return response.status(400).json(apiResponse.json());
    }

    const guild = await Guild.findOne({ discordId });
    if (!guild) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Discord guild with discordId \`${discordId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(400).json(apiResponse.json());
    }

    let user = await User.findOne({ username });
    if (user) {

      if (user.guilds.filter(guildId => guildId == guild.id).length > 0) {
        apiResponse.addError({
          type: errorTypes.database.duplicate,
          message: `The user \`${username}\` is already registered in this guild`,
          kind: 'database.duplicate'
        });

        return response.status(409).json(apiResponse.json());
      }

      user.guilds.push(guild.id);
      await user.save();
      user.hideSensibleData();
      apiResponse.setPayload({
        user
      });

      return response.status(200).json(apiResponse.json());
    }

    // First use of the bot
    user = new User({
      username: request.body.username
    });
    user.guilds.push(guild.id);

    await user.generateAccessToken();
    const password = await user.generateTemporaryPassword();
    user = await user.save();

    const { accessToken, passwordExpirationDate } = user;
    apiResponse.setPayload({
      token: accessToken,
      tokenExpiresIn: env.tokenExpirationTime,
      password: password,
      expirationDate: passwordExpirationDate
    });
    return response.status(201).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.post('/authenticate', async (request, response) => {
  const { username, password } = request.body;
  const apiResponse = new ApiResponse();
  if (!username) {
    apiResponse.addError({
      type: errorTypes.validations.required,
      message: 'Field `username` is required',
      kind: 'validations.required'
    });
  }

  if (!password) {
    apiResponse.addError({
      type: errorTypes.validations.required,
      message: 'Field `password` is required',
      kind: 'validations.required'
    });
  }

  if (!username || !password) {
    return response.status(400).json(apiResponse.json());
  }

  const user = await User.findOne({ username }).select(
    '+password +accessToken'
  );
  if (!user) {
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `User \`${username}\` is not registered`,
      kind: 'entity.notfound'
    });
    return response.status(404).send(apiResponse.json());
  }

  const { error } = await user.checkPassword(password);
  if (error) {
    apiResponse.addError({
      type: error.name,
      message: error.message,
      kind: 'authentication.password'
    });

    return response.status(400).json(apiResponse.json());
  }

  await user.generateAccessToken();
  await user.save();

  const { accessToken } = user;
  user.hideSensibleData();

  apiResponse.setPayload({ user, token: accessToken });
  return response.status(201).json(apiResponse.json());
});

router.post(
  '/logout',
  bearerAuthenticationInterceptor,
  async (request, response) => {
    const user = await User.findById(request.userId).select('+accessToken');
    if (user) {
      await user.resetAccessToken();
      await user.save();
    }

    return response.status(204).json();
  }
);

router.post(
  '/change-password',
  bearerAuthenticationInterceptor,
  async (request, response) => {
    const { newPassword, confirmationPassword } = request.body;
    const apiResponse = new ApiResponse();
    if (newPassword !== confirmationPassword) {
      apiResponse.addError({
        type: errorTypes.authentication.password.confirmation,
        message:
          'Confirmation password does not match with the password provided',
        kind: 'authentication.password.confirmation'
      });

      return response.status(400).json(apiResponse.json());
    }

    const user = await User.findById(request.userId).select('+password');
    if (!user) {
      apiResponse.addError({
        type: errorTypes.authentication.error.token,
        message: "Token provided reflects an user that don't exist",
        kind: 'authentication.error.token'
      });

      return response.status(400).json(apiResponse.json());
    }

    user.password = newPassword;
    user.isValidated = true;
    user.passwordExpirationDate = null;
    await user.save();

    return response.status(201).json();
  }
);

router.post('/reset-password', clientIdentificationInterceptor, async (request, response) => {
  const { username } = request.body;
  const apiResponse = new ApiResponse();
  const user = await User.findOne({ username }).select(
    '+password +expiredPassword'
  );

  if (!user) {
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `User \`${username}\` is not registered`,
      kind: 'entity.notfound'
    });

    return response.status(404).send(apiResponse.json());
  }

  const password = await user.generateTemporaryPassword();
  await user.save();
  apiResponse.setPayload({
    password: password,
    expirationDate: user.passwordExpirationDate
  });
  return response.status(201).json(apiResponse.json());
});

export default router;
