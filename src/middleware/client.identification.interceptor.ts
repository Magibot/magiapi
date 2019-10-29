import { Request, Response, NextFunction } from 'express';

import ApiResponse from '../app/api.response';
import errorTypes from '../app/types/errors';

import Client from '../models/client.model';
import exceptionHandler from '../helpers/general.exception.handler';

// Protection by Client Identification, only registered clients can access the routes

export default async function(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apiResponse = new ApiResponse();
  const errorResponse = {
    type: errorTypes.authentication.error.client,
    message: '',
    kind: 'authentication.error.client'
  };

  const clientId = request.headers.authorization;

  if (!clientId) {
    errorResponse.message = 'No authorization header provided';
    apiResponse.addError(errorResponse);
    return response.status(401).json(apiResponse.json());
  }

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      errorResponse.message = `Client \`${clientId}\` does not exist`;
      apiResponse.addError(errorResponse);
      return response.status(401).json(apiResponse.json());
    }

    next();
  } catch (err) {
    const { statusCode, jsonResponse, type } = exceptionHandler(err);
    if (type === 'ObjectIdCastError') {
      errorResponse.message = `Client Id provided \`${clientId}\` for authorization is not valid`;
      apiResponse.addError(errorResponse);
      return response.status(401).json(apiResponse.json());
    }
    return response.status(statusCode).json(jsonResponse);
  }
}
