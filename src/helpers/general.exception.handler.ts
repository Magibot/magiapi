import Logger from '../app/api.logger';
import ApiResponse from '../app/api.response';
import handleModelError from './model.error.handler';
import errorTypes from '../app/types/errors';

export function exceptionHandler(error: any) {
  const apiResponse = new ApiResponse();
  const processedError = handleModelError(error);

  if (processedError) {
    apiResponse.setError(processedError);
    return { statusCode: 400, jsonResponse: apiResponse.json() };
  }

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    apiResponse.addError({
      type: errorTypes.validations.invalid.id,
      kind: 'validations.invalid.id',
      message: `\`${error.value}\` is not a valid object ID.`
    });

    return { statusCode: 400, jsonResponse: apiResponse.json() };
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    apiResponse.addError({
      type: errorTypes.database.duplicate,
      message: error.errmsg,
      kind: 'database.duplicate'
    });

    return { statusCode: 409, jsonResponse: apiResponse.json() };
  }

  Logger.ApiConsole.error(error);
  apiResponse.addError({
    type: errorTypes.internal.error,
    message: 'Something went wrong. Please contact a administrator',
    kind: 'internal.error'
  });

  return { statusCode: 500, jsonResponse: apiResponse.json() };
}

export default exceptionHandler;
