import express from 'express';
import bcrypt from 'bcryptjs';

import ApiResponse from '../../../app/api.response';
import User from '../../../models/user.model';

import exceptionHandler from '../../../helpers/general.exception.handler';

import errorTypes from '../../../app/types/errors';
import Guild from '../../../models/guild.model';

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

    user = await user.save();
    await user.generateAccessToken();

    const { accessToken, temporaryPassword, temporaryPasswordExpirationDate } = user;
    apiResponse.setPayload({
      token: accessToken,
      password: temporaryPassword,
      expirationDate: temporaryPasswordExpirationDate
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

  const user = await User.findOne({ username }).select('+password +temporaryPassword +accessToken');
  if (!user) {
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `User \`${username}\` is not registered`,
      kind: 'entity.notfound'
    });
    return response.status(404).send(apiResponse.json());
  }

  const { isValid } = await User.verifyTemporaryPassword(user);
  if (isValid) {
    if (user.temporaryPassword !== password) {
      apiResponse.addError({
        type: errorTypes.authentication.password.invalid,
        message: 'Wrong password',
        kind: 'authentication.password.invalid'
      });

      return response.status(400).send(apiResponse.json());
    }

    await user.generateAccessToken();
    const { accessToken } = user;
    user.hideSensibleData();
    return response.status(201).json({ user, token: accessToken });
  }

  if (!user.password) {
    apiResponse.addError({
      type: errorTypes.authentication.password.expired,
      message: 'Temporary password expired. Please create a new password for your account',
      kind: 'authentication.password.expired'
    });

    return response.status(400).json(apiResponse.json());
  }

  const { error } = await user.comparePassword(password);
  if (error) {
    apiResponse.addError({
      type: errorTypes.authentication.password.invalid,
      message: error.message,
      kind: 'authentication.password.invalid'
    });

    return response.status(400).send(apiResponse.json());
  }

  await user.generateAccessToken();
  const { accessToken } = user;
  user.hideSensibleData();
  return response.status(201).json({ user, token: accessToken });
});

export default router;
