import mongoose from '../config/mongoose';

import Song, { ISong } from './song.model';
import Guild from './guild.model';

import ApiResponse from '../app/api.response';
import errorTypes from '../app/types/errors';

export interface IPlaylist extends mongoose.Document {
  guild: string;
  name: string;
  creator: string;
  allowModify: boolean;
  songs: Array<string>;
  createdAt: Date;
}

export interface IPlaylistModel extends mongoose.Model<IPlaylist> {
  findByIdAndInsertSong: (id: string, song: ISong) => IPlaylist;
  findByIdAndRemoveSong: (id: string, song: string) => void;
  findSongById: (id: string, songId: string) => null | ISong;
}

export const PlaylistSchema = new mongoose.Schema({
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  allowModify: {
    type: Boolean,
    default: true
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
PlaylistSchema.index({ guild: 1, name: 1 }, { unique: true });

// Statics
PlaylistSchema.statics.findByIdAndInsertSong = async function(
  id: string,
  song: ISong
) {
  const playlist = await Playlist.findById(id);
  if (!playlist) {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `Playlist \`${id}\` does not exist`,
      kind: 'entity.notfound'
    });

    throw apiResponse;
  }

  const index = playlist.songs.indexOf(song._id);
  if (index > -1) {
    return playlist;
  }

  playlist.songs.push(song._id);
  await playlist.save();
  return playlist;
};

PlaylistSchema.statics.findByIdAndRemoveSong = async function(
  id: string,
  songId: string
) {
  const playlist = await Playlist.findById(id);
  if (!playlist) {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `Playlist \`${id}\` does not exist`,
      kind: 'entity.notfound'
    });

    throw apiResponse;
  }

  const index = playlist.songs.indexOf(songId);
  if (index < 0) {
    return;
  }

  playlist.songs.splice(index, 1);
  await playlist.save();
};

PlaylistSchema.statics.findSongById = async function(
  id: string,
  songId: string
) {
  const playlist = await Playlist.findById(id);
  if (!playlist) {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `Playlist \`${id}\` does not exist`,
      kind: 'entity.notfound'
    });

    throw apiResponse;
  }

  const index = playlist.songs.indexOf(songId);
  if (index < 0) {
    return null;
  }

  return playlist.songs[index];
};

PlaylistSchema.pre('save', async function(next) {
  const playlist = this as IPlaylist;
  await Guild.createPlaylist(playlist.guild, playlist);
  next();
});

PlaylistSchema.pre('remove', async function(next) {
  const playlist = this as IPlaylist;
  await Guild.deletePlaylist(playlist.guild, playlist.id);
  await Song.deleteMany({ playlist: playlist.id });
  next();
});

export const Playlist: IPlaylistModel = mongoose.model<
  IPlaylist,
  IPlaylistModel
>('Playlist', PlaylistSchema);

export default Playlist;
