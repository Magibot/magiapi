const jsonSchema = {
  type: 'object',
  required: ['payload'],
  properties: {
    payload: {
      type: 'object',
      required: ['user'],
      properties: {
        user: {
          type: 'object',
          required: [
            'passwordExpirationDate',
            'guilds',
            'isValidated',
            '_id',
            'username',
            'createdAt'
          ],
          properties: {
            passwordExpirationDate: {
              type: 'string'
            },
            guilds: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            isValidated: {
              type: 'boolean'
            },
            _id: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            createdAt: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};

module.exports = jsonSchema;
