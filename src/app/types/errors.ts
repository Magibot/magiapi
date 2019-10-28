export const errors = {
  validations: {
    required: 'ValidationError',
    invalid: {
      id: 'InvalidObjectId',
      query: 'InvalidQueryParameter'
    }
  },
  authentication: {
    badpassword: 'InvalidPassword',
    error: {
      token: 'TokenError'
    }
  },
  entity: {
    notfound: 'EntityNotFound'
  },
  database: {
    duplicate: 'ConflictError'
  },
  internal: {
    error: 'InternalError'
  }
};

export default errors;
