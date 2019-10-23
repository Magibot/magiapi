import ApiResponse from '../app/api.response';
import handleModelError from './model.error.handler';

export function exceptionHandler(error: any) {
  const apiResponse = new ApiResponse();
  const processedError = handleModelError(error);

  if (processedError) {
    apiResponse.setError(processedError);
    return { statusCode: 400, jsonResponse: apiResponse.json() };
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    apiResponse.addError({
      type: 'ConflictError',
      message: error.errmsg,
      kind: 'duplicate'
    });

    return { statusCode: 409, jsonResponse: apiResponse.json() };
  }

  console.error(error);
  apiResponse.addError({
    type: 'InternalError',
    message: 'Something went wrong. Please contact a administrator',
    kind: 'RuntimeError'
  });

  return { statusCode: 500, jsonResponse: apiResponse.json() };
}

export default exceptionHandler;
