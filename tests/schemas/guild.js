const jsonSchema = {
  type: 'object',
  required: ['payload'],
  properties: {
    payload: {
      type: 'object',
      required: ['guild'],
      properties: {
        guild: {
          type: 'object',
          required: [
            'playlists',
            '_id',
            'name',
            'discordId',
            'discordOwnerId',
            'createdAt'
          ],
          properties: {
            playlists: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            _id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            discordId: {
              type: 'string'
            },
            discordOwnerId: {
              type: 'string'
            },
            createdAt: {
              type: 'string'
            },
            region: {
              type: 'string'
            },
            iconHash: {
              type: 'string'
            },
            customPrefix: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};

module.exports = jsonSchema;
