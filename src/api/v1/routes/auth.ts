import env from '../../../config/env';
import express from 'express';

import ApiResponse from '../../../app/api.response';
import User from '../../../models/user.model';

import exceptionHandler from '../../../helpers/general.exception.handler';

import errorTypes from '../../../app/types/errors';
import Guild from '../../../models/guild.model';

import bearerAuthenticationInterceptor from '../middleware/bearer.auth.interceptor';

const router = express.Router({ mergeParams: true });

router.post('/register', async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const { discord_id } = request.headers;
    if (!discord_id) {
      apiResponse.addError({
        type: errorTypes.validations.required,
        message: 'Missing header `discord_id` for guild identification',
        kind: 'validations.required'
      });

      return response.status(400).json(apiResponse.json());
    }

    const guild = await Guild.findOne({ discordId: discord_id });
    if (!guild) {
      apiResponse.addError({
        type: errorTypes.validations.invalid.headers,
        message: 'This discord guild does not exist',
        kind: 'validations.invalid.headers'
      });

      return response.status(400).json(apiResponse.json());
    }

    let user = new User({
      username: request.body.username
    });

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
  return response.status(201).json({ user, token: accessToken });
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

router.post('/reset-password', async (request, response) => {
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
