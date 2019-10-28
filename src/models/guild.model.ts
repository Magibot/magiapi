import mongoose from '../config/mongoose';
import Playlist  from './playlist.model';
import Song  from './song.model';

export interface IGuild extends mongoose.Document {
  name: string;
  discordId: string;
  region: string;
  discordOwnerId: string;
  iconHash: string;
  createdAt: Date;
}

export const GuildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  discordId: {
    type: String,
    required: true,
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

GuildSchema.pre('remove', async function(next) {
  const guild = this as IGuild;
  await Song.deleteMany({ guild: guild._id });
  await Playlist.deleteMany({ guild: guild._id });
  next();
});

export const Guild = mongoose.model<IGuild>('Guild', GuildSchema);

export default Guild;
