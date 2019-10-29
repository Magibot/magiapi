import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../../config/env';

import ApiResponse from '../../../app/api.response';
import Logger from '../../../app/api.logger';

import errorTypes from '../../../app/types/errors';

// Protection by Beare Authorization, only logged user can access routes

export default function(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apiResponse = new ApiResponse();
  const errorResponse = {
    type: errorTypes.authentication.error.token,
    message: '',
    kind: 'authentication.error.token'
  };

  const bearerAuthentication = request.headers.authorization;

  if (!bearerAuthentication) {
    errorResponse.message = 'No token provided';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }

  const parts = bearerAuthentication.split(' ');
  if (parts.length !== 2) {
    errorResponse.message = 'Invalid token';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    errorResponse.message = 'Malformed token';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }

  try {
    const decoded = jwt.verify(token, env.tokenSecret);
    if (typeof decoded === 'string') {
      Logger.ApiConsole.normal(decoded);
      return;
    }

    request.userId = (decoded as any).id;
    next();
  } catch (error) {
    Logger.ApiConsole.error(error);
    errorResponse.message = 'Error on processing token. Invalid token';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }
}
