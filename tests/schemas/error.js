const jsonSchema = {
  type: 'object',
  required: ['errors'],
  properties: {
    errors: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['type', 'message', 'kind'],
        properties: {
          type: {
            type: 'string'
          },
          message: {
            type: 'string'
          },
          kind: {
            type: 'string'
          }
        }
      }
    }
  }
};

module.exports = jsonSchema;
