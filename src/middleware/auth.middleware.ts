import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../app/api.response';

import errorTypes from '../app/types/errors';

import bearerAuthenticationInterceptor from './bearer.auth.interceptor';
import clientIdentificationInterceptor from './client.identification.interceptor';

export default function(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apiResponse = new ApiResponse();
  const errorResponse = {
    type: errorTypes.authentication.error.type,
    message: '',
    kind: 'authentication.error.type'
  };

  const authorizationType = request.headers.authorization_type;

  if (!authorizationType) {
    errorResponse.message = 'Missing `authorization_type` header';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }

  if (authorizationType === 'access_token') {
    return bearerAuthenticationInterceptor(request, response, next);
  }

  if (authorizationType === 'client_id') {
    return clientIdentificationInterceptor(request, response, next);
  }

  errorResponse.message = 'Invalid `authorization_type` header';
  apiResponse.addError(errorResponse);
  return response.status(401).json(apiResponse.json());
}
