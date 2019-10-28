import mongoose from '../config/mongoose';

export interface IPlaylist extends mongoose.Document {
  guildId: string;
  name: string;
  creator: string;
  allowModify: boolean;
  songs: Array<string>;
  createdAt: Date;
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

PlaylistSchema.index({ guild: 1, name: 1 }, { unique: true });

export const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema);

export default Playlist;
