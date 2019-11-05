import express from 'express';

// Models
import Guild from '../../../models/guild.model';
import Playlist from '../../../models/playlist.model';

// Middlewares
import authMiddleware from '../middleware/auth.middleware';

// Helpers
import ApiResponse from '../../../app/api.response';
import exceptionHandler from '../../../helpers/general.exception.handler';

// Types
import errorTypes from '../../../app/types/errors';

// Resources
import songRouter from './playlist.resources/song';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/:playlistId', async (request, response) => {
  const { playlistId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    let playlist;
    if (request.query._populate === 'songs') {
      playlist = await Playlist.findById(playlistId).populate(
        request.query._populate,
        'url addedBy title youtubeChannelId youtubeChannelName youtubeChannelUrl lengthSeconds createdAt'
      );
    } else {
      playlist = await Playlist.findById(playlistId);
    }

    if (!playlist) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Playlist \`${playlistId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    apiResponse.setPayload({ playlist });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.put('/:playlistId', async (request, response) => {
  const { playlistId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    let playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Playlist \`${playlistId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    playlist.name = request.body.name;
    playlist.creator = request.body.creator;
    playlist.allowModify = request.body.allowModify;
    playlist = await playlist.save();

    apiResponse.setPayload({ playlist });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.delete('/:playlistId', async (request, response) => {
  const { playlistId } = request.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      await playlist.remove();
    }

    return response.status(204).json();
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.use('/:playlistId/songs', songRouter);

export default router;
