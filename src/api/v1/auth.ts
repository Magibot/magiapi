import express from 'express';
import bcrypt from 'bcryptjs';

import ApiResponse from '../../app/api.response';
import User from '../../models/user.model';

import exceptionHandler from '../../helpers/general.exception.handler';
import generateJwt from '../../helpers/token.generator';

import errorTypes from '../../app/types/errors';
import Guild from '../../models/guild.model';

const router = express.Router();

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
        message: 'This discord guild is not registered. Please enter within a valid discord server',
        kind: 'validations.invalid.headers'
      });

      return response.status(400).json(apiResponse.json());
    }

    const user = await User.create(request.body);
    const token = generateJwt({ id: user.id });
    user.password = undefined;
    apiResponse.setPayload({ user, token });
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
      kind: 'validations.required',
      message: 'Field `username` is required'
    });
  }

  if (!password) {
    apiResponse.addError({
      type: errorTypes.validations.required,
      kind: 'validations.required',
      message: 'Field `password` is required'
    });
  }

  if (!username || !password) {
    return response.status(400).json(apiResponse.json());
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `User \`${username}\` is not registered`,
      kind: 'entity.notfound'
    });
    return response.status(404).send(apiResponse.json());
  }

  if (!(await bcrypt.compare(password, user.password))) {
    apiResponse.addError({
      type: errorTypes.authentication.badpassword,
      message: 'Wrong password',
      kind: 'authentication.badpassword'
    });
    return response.status(400).send(apiResponse.json());
  }

  user.password = undefined;

  return response.status(201).json({ user, token: generateJwt({ id: user.id }) });
});

export default router;
