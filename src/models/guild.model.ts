import mongoose from '../config/mongoose';

import Playlist, { IPlaylist } from './playlist.model';
import Song from './song.model';

import ApiResponse from '../app/api.response';
import errorTypes from '../app/types/errors';

export interface IGuild extends mongoose.Document {
  name: string;
  discordId: string;
  region: string;
  customPrefix: string;
  discordOwnerId: string;
  playlists: Array<string>;
  iconHash: string;
  createdAt: Date;
}

export interface IGuildModel extends mongoose.Model<IGuild> {
  createPlaylist: (id: string, playlist: IPlaylist) => IGuild;
  deletePlaylist: (id: string, playlistId: string) => void;
}

export const GuildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  customPrefix: {
    type: String,
    trim: true,
    maxlength: 1
  },
  region: {
    type: String
  },
  discordOwnerId: {
    type: String,
    required: true
  },
  iconHash: {
    type: String
  },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Statics
GuildSchema.statics.createPlaylist = async function(
  id: string,
  playlist: IPlaylist
) {
  const guild = await Guild.findById(id);
  if (!guild) {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `Guild \`${id}\` does not exist`,
      kind: 'entity.notfound'
    });

    throw apiResponse;
  }

  const index = guild.playlists.indexOf(playlist._id);
  if (index > -1) {
    return guild;
  }

  guild.playlists.push(playlist._id);
  return await guild.save();
};

GuildSchema.statics.deletePlaylist = async function(id: string, playlistId: string) {
  const guild = await Guild.findById(id);
  if (!guild) {
    const apiResponse = new ApiResponse();
    apiResponse.addError({
      type: errorTypes.entity.notfound,
      message: `Guild \`${id}\` does not exist`,
      kind: 'entity.notfound'
    });

    throw apiResponse;
  }

  const index = guild.playlists.indexOf(playlistId);
  if (index < 0) {
    return;
  }

  guild.playlists.splice(index, 1);
  await guild.save();
}

// Middlewares
GuildSchema.pre('remove', async function(next) {
  const guild = this as IGuild;
  await Song.deleteMany({ guild: guild._id });
  await Playlist.deleteMany({ guild: guild._id });
  next();
});

export const Guild: IGuildModel = mongoose.model<IGuild, IGuildModel>(
  'Guild',
  GuildSchema
);

export default Guild;
