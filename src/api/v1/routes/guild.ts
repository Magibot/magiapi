import express from 'express';

// Models
import Guild from '../../../models/guild.model';

// Middlewares
import authMiddleware from '../middleware/auth.middleware';
import clientIdentificationInterceptor from '../middleware/client.identification.interceptor';

// Helpers
import ApiResponse from '../../../app/api.response';
import exceptionHandler from '../../../helpers/general.exception.handler';

// Types
import errorTypes from '../../../app/types/errors';

// Resources
import playlistRouter from './guild.resources/playlist';

const router = express.Router({ mergeParams: true });

router.use('/:guildId', async (request, response, next) => {
  if (!request.params.guildId) {
    next();
  }

  const apiResponse = new ApiResponse();
  const { guildId } = request.params;
  let { typeId } = request.query;
  if (!typeId) {
    typeId = 'objectId';
  }

  try {
    let guild;
    if (typeId === 'objectId') {
      guild = await Guild.findById(guildId);
    } else if (typeId === 'discordId') {
      guild = await Guild.findOne({ discordId: guildId });
    } else {
      apiResponse.addError({
        type: errorTypes.validations.invalid.query,
        message: `Query parameter \`typeId\` is invalid. It should be equals to \`objectId\` or \`discordId\``,
        kind: 'validations.invalid.query'
      });

      return response.status(400).json(apiResponse.json());
    }

    const { method } = request;
    const needReturnNotFound =
      method === 'GET' || method === 'PUT' || method === 'PATCH';
    if (!guild && needReturnNotFound) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Guild \`${guildId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    const { _populate } = request.query;
    if (guild && _populate && _populate === 'playlists') {
      guild = guild.populate(
        'playlists',
        'name creator allowModify createdAt songs'
      );
    }

    request.guild = guild;
    next();
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.post('/', clientIdentificationInterceptor, async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    let guild = new Guild({
      name: request.body.name,
      discordId: request.body.discordId,
      region: request.body.region,
      customPrefix: request.body.customPrefix,
      discordOwnerId: request.body.discordOwnerId,
      iconHash: request.body.iconHash
    });
    guild = await guild.save();

    apiResponse.setPayload({ guild });
    return response.status(201).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.get('/:guildId', authMiddleware, async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const { guild } = request;
    apiResponse.setPayload({ guild });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.put(
  '/:guildId',
  clientIdentificationInterceptor,
  async (request, response) => {
    const apiResponse = new ApiResponse();
    try {
      let { guild } = request;

      if (!guild) {
        // Never happening, cause method validation on middleware
        return;
      }

      guild.name = request.body.name;
      guild.discordId = request.body.discordId;
      guild.region = request.body.region;
      guild.customPrefix = request.body.customPrefix;
      guild.discordOwnerId = request.body.discordOwnerId;
      guild.iconHash = request.body.iconHash;

      guild = await guild.save();

      apiResponse.setPayload({ guild });
      return response.status(200).json(apiResponse.json());
    } catch (err) {
      const { statusCode, jsonResponse } = exceptionHandler(err);
      return response.status(statusCode).json(jsonResponse);
    }
  }
);

router.patch('/:guildId', authMiddleware, async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    let { guild } = request;
    if (!guild) {
      // Never happening, cause method validation on middleware
      return;
    }

    guild.set(request.body);
    guild = await guild.save();
    apiResponse.setPayload({ guild });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.delete(
  '/:guildId',
  clientIdentificationInterceptor,
  async (request, response) => {
    const apiResponse = new ApiResponse();
    try {
      const { guild } = request;

      if (guild) {
        await guild.remove();
      }

      return response.status(204).json(apiResponse.json());
    } catch (err) {
      const { statusCode, jsonResponse } = exceptionHandler(err);
      return response.status(statusCode).json(jsonResponse);
    }
  }
);

router.use('/:guildId/playlists', playlistRouter);

export default router;
