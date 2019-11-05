import express from 'express';

// Models
import Song from '../../../../models/song.model';

// Helpers
import ApiResponse from '../../../../app/api.response';
import exceptionHandler from '../../../../helpers/general.exception.handler';
import handlePagination from '../../../../helpers/pagination.handler';
import Playlist from '../../../../models/playlist.model';

import errorTypes from '../../../../app/types/errors';

import songRouter from '../song';

const router = express.Router({ mergeParams: true });

router.post('/', async (request, response) => {
  const { playlistId, guildId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    if (!(await Playlist.findById(playlistId))) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Platlist \`${playlistId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    if (await Song.findOne({ title: request.body.title, playlist: playlistId })) {
      apiResponse.addError({
        type: errorTypes.database.duplicate,
        message: `Song \`${request.body.title}\` already exists in playlist`,
        kind: 'database.duplicate'
      });

      return response.status(409).json(apiResponse.json());
    }

    let song = new Song({
      guild: guildId,
      playlist: playlistId,
      url: request.body.url,
      addedBy: request.body.addedBy,
      title: request.body.title,
      youtubeChannelId: request.body.youtubeChannelId,
      youtubeChannelName: request.body.youtubeChannelName,
      youtubeChannelUrl: request.body.youtubeChannelUrl,
      lengthSeconds: request.body.lengthSeconds
    });

    song = await song.save();
    apiResponse.setPayload({ song });
    return response.status(201).json(apiResponse.json());
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

router.get('/', async (request, response) => {
  const { playlistId } = request.params;
  const apiResponse = new ApiResponse();
  // Pagination values
  const { _offset, _limit } = request.query;
  try {
    let query = Song.find({ playlist: playlistId }).sort('createdAt');
    query = handlePagination(query, { offset: _offset, limit: _limit });

    const songs = await query.exec();
    apiResponse.setPayload({ songs });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.use('/:songId', songRouter);

export default router;
