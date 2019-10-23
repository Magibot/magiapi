import mongoose from '../config/mongoose';

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

export const Guild = mongoose.model<IGuild>('Guild', GuildSchema);

export default Guild;
