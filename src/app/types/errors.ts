export const errors = {
  validations: {
    required: 'ValidationError',
    invalid: {
      id: 'InvalidObjectId',
      query: 'InvalidQueryParameter',
      headers: 'InvalidHeaders'
    }
  },
  authentication: {
    password: {
      invalid: 'InvalidPassword',
      expired: 'PasswordExpired'
    },
    error: {
      token: 'TokenError',
      client: 'ClientRegisterError',
      type: 'AuthorizationType'
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
