const jsonSchema = {
  type: 'object',
  required: ['payload'],
  properties: {
    payload: {
      type: 'object',
      required: ['token', 'tokenExpiresIn', 'password', 'expirationDate'],
      properties: {
        token: {
          type: 'string'
        },
        tokenExpiresIn: {
          type: 'number'
        },
        password: {
          type: 'string'
        },
        expirationDate: {
          type: 'string'
        }
      }
    }
  }
};

module.exports = jsonSchema;
