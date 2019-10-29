import express from 'express';

// Models
import Guild from '../../../models/guild.model';

// Middlewares
import clientIdentificationInterceptor from '../../../middleware/client.identification.interceptor';

// Helpers
import ApiResponse from '../../../app/api.response';
import exceptionHandler from '../../../helpers/general.exception.handler';

// Types
import errorTypes from '../../../app/types/errors';

// Resources
import playlistRouter from './guild.resources/playlist';

const router = express.Router();

router.post('/', clientIdentificationInterceptor, async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    let guild = new Guild({
      name: request.body.name,
      discordId: request.body.discordId,
      region: request.body.region,
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

router.get('/:guildId', async (request, response) => {
  const apiResponse = new ApiResponse();
  const { guildId } = request.params;
  try {
    let guild;
    if (request.query._populate && request.query._populate === 'playlists') {
      guild = await Guild.findById(guildId).populate(
        request.query._populate,
        'name creator allowModify createdAt songs'
      );
    } else {
      guild = await Guild.findById(guildId);
    }

    if (!guild) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Guild \`${guildId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    apiResponse.setPayload({ guild });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.put('/:guildId', clientIdentificationInterceptor, async (request, response) => {
  const { guildId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    let guild = await Guild.findById(guildId);

    if (!guild) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Guild \`${guildId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    guild.name = request.body.name;
    guild.discordId = request.body.discordId;
    guild.region = request.body.region;
    guild.discordOwnerId = request.body.discordOwnerId;
    guild.iconHash = request.body.iconHash;

    guild = await guild.save();

    apiResponse.setPayload({ guild });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.delete('/:guildId', clientIdentificationInterceptor, async (request, response) => {
  const { guildId } = request.params;
  try {
    const guild = await Guild.findById(guildId);
    if (guild) {
      await guild.remove();
    }

    return response.status(204).json();
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.use('/:guildId/playlists', async (request, response, next) => {
  request.guildId = request.params.guildId;
  next();
});

router.use('/:guildId/playlists', playlistRouter);

export default router;
