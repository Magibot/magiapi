import express from 'express';

// Models
import Song from '../../../../models/song.model';

// Helpers
import ApiResponse from '../../../../app/api.response';
import exceptionHandler from '../../../../helpers/general.exception.handler';
import Playlist from '../../../../models/playlist.model';

import errorTypes from '../../../../app/types/errors';

const router = express.Router();

router.post('/', async (request, response) => {
  const { playlistId, guildId } = request;
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

    if (
      await Song.findOne({ title: request.body.title, playlist: playlistId })
    ) {
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
  const { playlistId } = request;
  const apiResponse = new ApiResponse();
  try {
    const songs = await Song.find({ playlist: playlistId });
    apiResponse.setPayload({ songs });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.get('/:songId', async (request, response) => {
  const { songId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    let song;
    if (request.query._populate === 'playlist') {
      song = await Song.findById(songId).populate(
        request.query._populate,
        'name creator allowModify createdAt guild'
      );
    } else {
      song = await Song.findById(songId);
    }

    if (!song) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Song \`${songId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    apiResponse.setPayload({ song });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.delete('/:songId', async (request, response) => {
  const { songId } = request.params;
  try {
    const song = await Song.findById(songId);
    if (song) {
      await song.remove();
    }

    return response.status(204).json();
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

export default router;
