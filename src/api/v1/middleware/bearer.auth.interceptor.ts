import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../../../app/api.response';

import errorTypes from '../../../app/types/errors';
import User from '../../../models/user.model';

// Protection by Beare Authorization, only logged user can access routes

export default async function(
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

  const { user, error } = await User.verifyToken(token);
  if (error) {
    errorResponse.message = error.message;
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json())
  }

  if (user) {
    request.userId = user.id;
  }

  next();
}
