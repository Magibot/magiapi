import express from 'express';

// Models
import Playlist from '../../../../models/playlist.model';
import Song from '../../../../models/song.model';

// Helpers
import ApiResponse from '../../../../app/api.response';
import exceptionHandler from '../../../../helpers/general.exception.handler';

// Types
import errorTypes from '../../../../app/types/errors';

const router = express.Router();

router.post('/', async (request, response) => {
  const { playlistId } = request;
  const apiResponse = new ApiResponse();
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      apiResponse.addError({
        type: errorTypes.entity.notfound,
        message: `Playlist \`${playlistId}\` does not exist`,
        kind: 'entity.notfound'
      });

      return response.status(404).json(apiResponse.json());
    }

    const song = await Song.create({ ...request.body, playlist: playlistId });
    playlist.songs.push(song.id);
    await playlist.save();
    apiResponse.setPayload({ song });
    return response.status(201).json(apiResponse.json());
  } catch (err) {
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
    if (request.query._populate) {
      song = await Song.findById(songId).populate(
        request.query._populate,
        'name creator allowModify createdAt guild'
      );
    } else {
      song = await Song.findById(songId);
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
  const { playlistId } = request;
  try {
    await Song.findByIdAndDelete(songId);
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      const index = playlist.songs.indexOf(songId);
      if (index > -1) {
        playlist.songs.splice(index, 1);
      }
      await playlist.save();
    }

    return response.status(204).json();
  } catch (err) {
    const { statusCode, jsonResponse } = exceptionHandler(err);
    return response.status(statusCode).json(jsonResponse);
  }
});

export default router;
