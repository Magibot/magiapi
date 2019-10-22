import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

import ApiResponse from '../app/api.response';

export default function(request: Request, response: Response, next: NextFunction) {
  const apiResponse = new ApiResponse();
  const error = {
    type: 'AuthenticationError',
    message: '',
    kind: 'token'
  };

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    error.message = 'No token provided';
    apiResponse.addError(error);
    return response.status(401).json(apiResponse.json());
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    error.message = 'Invalid token';
    apiResponse.addError(error);
    return response.status(401).json(apiResponse.json());
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    error.message = 'Malformed token';
    apiResponse.addError(error);
    return response.status(401).json(apiResponse.json());
  }

  jwt.verify(token, env.tokenSecret, (err, decoded) => {
    if (err) {
      error.message = 'Error on processing token. Invalid token';
      apiResponse.addError(error);
      return response.status(401).json(apiResponse.json());
    };

    if (typeof decoded === 'string') {
      return;
    }

    request.userId = (decoded as any).id;
  });

  next();
}
