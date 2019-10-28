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
    const guild = await Guild.findById(guildId);
    if (!guild) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Guild \`${guildId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    const playlist = await Playlist.create({ ...request.body, guild: guildId });
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
    const playlist = await Playlist.findById(playlistId).populate(
      request.query._populate,
      'url addedBy title youtubeChannelId youtubeChannelName youtubeChannelUrl lengthSeconds createdAt'
    );
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
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      request.body,
      { new: true }
    );
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

router.delete('/:playlistId', async (request, response) => {
  const { playlistId } = request.params;
  try {
    await Playlist.findByIdAndRemove(playlistId);
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
