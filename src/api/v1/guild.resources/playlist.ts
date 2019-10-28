import express from 'express';

// Models
import Guild from '../../../models/guild.model';
import Playlist from '../../../models/playlist.model';

// Helpers
import ApiResponse from '../../../app/api.response';
import exceptionHandler from '../../../helpers/general.exception.handler';

// Types
import errorTypes from '../../../app/types/errors';

// Resources
import songRouter from './playlist.resources/song';

const router = express.Router();

router.post('/', async (request, response) => {
  const { guildId } = request;
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
  const { guildId } = request;
  const apiResponse = new ApiResponse();
  try {
    const playlists = await Playlist.find({ guild: guildId });
    apiResponse.setPayload({ playlists });
    return response.status(200).json(apiResponse.json());
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

router.get('/:playlistId', async (request, response) => {
  const { playlistId } = request.params;
  const apiResponse = new ApiResponse();
  try {
    let playlist;
    if (request.query._populate) {
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

router.use('/:playlistId/songs', async (request, response, next) => {
  request.playlistId = request.params.playlistId;
  next();
});

router.use('/:playlistId/songs', songRouter);

export default router;
