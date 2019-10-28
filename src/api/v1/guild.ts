import express from 'express';

// Models
import Guild from '../../models/guild.model';

// Middlewares
import authInterceptor from '../../middleware/auth.interceptor';

// Helpers
import ApiResponse from '../../app/api.response';
import exceptionHandler from '../../helpers/general.exception.handler';

// Types
import errorTypes from '../../app/types/errors';

// Resources
import playlistRouter from './guild.resources/playlist';

const router = express.Router();

// Use authentication interceptor to protect the routes of guild
router.use(authInterceptor);

router.post('/', async (request, response) => {
  const apiResponse = new ApiResponse();
  try {
    const guild = await Guild.create(request.body);
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
    const guild = await Guild.findById(guildId);
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

router.put('/:guildId', async (request, response) => {
  const { guildId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    const guild = await Guild.findByIdAndUpdate(guildId, request.body, {
      new: true
    });
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

router.delete('/:guildId', async (request, response) => {
  const { guildId } = request.params;
  try {
    await Guild.findByIdAndRemove(guildId);
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
