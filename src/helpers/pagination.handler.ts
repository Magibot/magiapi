import mongoose from 'mongoose';
import ApiResponse from '../app/api.response';
import errorTypes from '../app/types/errors';

export interface PaginationParameter {
  offset: any;
  limit: any;
}

export const validatePaginationParameters = (params: PaginationParameter) => {
  const { offset, limit } = params;
  const apiResponse = new ApiResponse();
  let hasErrors = false;
  if (offset && isNaN(offset)) {
    apiResponse.addError({
      type: errorTypes.validations.invalid.query,
      message: `Query parameter _offset is invalid. Should be a number`,
      kind: 'validations.invalid.query'
    });

    hasErrors = true;
  }

  if (limit && isNaN(limit)) {
    apiResponse.addError({
      type: errorTypes.validations.invalid.query,
      message: 'Query parameter _limit is invalid. Should be a number',
      kind: 'validations.invalid.query'
    });

    hasErrors = true;
  }

  if (hasErrors) {
    throw apiResponse;
  }
};

export const handlePagination = (
  query: mongoose.DocumentQuery<any[], any>,
  params: PaginationParameter
) => {
  const { offset, limit } = params;

  validatePaginationParameters({ offset, limit });

  if (offset && !limit) {
    query = query.skip(parseInt(offset));
  } else if (!offset && limit) {
    query = query.limit(parseInt(limit));
  } else if (offset && limit) {
    query = query.skip(parseInt(offset)).limit(parseInt(limit));
  }

  return query;
};

export default handlePagination;
