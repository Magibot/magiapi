import express from 'express';
import bcrypt from 'bcryptjs';

import ApiResponse from '../../app/api.response';
import User from '../../models/user.model';

import handleModelError from '../../helpers/model.error.handler';
import generateJwt from '../../helpers/token.generator';

const router = express.Router();

router.post('/register', async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const user = await User.create(request.body);
    const token = generateJwt({ id: user.id });
    user.password = undefined;
    apiResponse.setPayload({ user, token });
    return response.status(201).json(apiResponse.json());
  } catch (err) {
    const processedError = handleModelError(err);

    if (processedError) {
      apiResponse.setError(processedError);
      return response.status(400).json(apiResponse.json());
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      apiResponse.addError({
        type: 'ConflictError',
        message: err.errmsg,
        kind: 'duplicate'
      });
      return response.status(409).json(apiResponse.json());
    }

    console.error(err);
    apiResponse.addError({
      type: 'InternalError',
      message: 'Something went wrong. Please contact a administrator',
      kind: 'RuntimeError'
    });

    return response.status(500).json(apiResponse.json());
  }
});

export default router;
