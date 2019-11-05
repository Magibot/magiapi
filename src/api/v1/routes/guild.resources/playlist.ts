import express from 'express';

// Models
import Guild from '../../../../models/guild.model';
import Playlist from '../../../../models/playlist.model';

// Middlewares
import authMiddleware from '../../middleware/auth.middleware';

// Helpers
import ApiResponse from '../../../../app/api.response';
import exceptionHandler from '../../../../helpers/general.exception.handler';
import handlePagination from '../../../../helpers/pagination.handler';

// Types
import errorTypes from '../../../../app/types/errors';

// Resources
import playlistRouter from '../playlist';
import songResourceRouter from '../playlist.resources/song';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.post('/', async (request, response) => {
  const { guildId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    if (!(await Guild.findById(guildId))) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Guild \`${guildId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    let playlist = new Playlist({
      guild: guildId,
      name: request.body.name,
      creator: request.body.creator,
      allowModify: request.body.allowModify
    });

    playlist = await playlist.save();
    apiResponse.setPayload({ playlist });
    return response.status(201).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.get('/', async (request, response) => {
  const { guildId } = request.params;
  const apiResponse = new ApiResponse();

  // Pagination values
  const { _offset, _limit } = request.query;

  try {
    let query = Playlist.find({ guild: guildId }).sort('createdAt');
    query = handlePagination(query, { offset: _offset, limit: _limit });

    const playlists = await query.exec();
    apiResponse.setPayload({ playlists });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    if (err instanceof ApiResponse) {
      const errorJson = err.json();
      if (errorJson.errors && errorJson.errors[0].kind === 'entity.notfound') {
        return response.status(204).json();
      } else {
        return response.status(400).json(errorJson);
      }
    }

    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.use('/:playlistId', playlistRouter);
router.use('/:playlistId/songs', songResourceRouter);

export default router;
