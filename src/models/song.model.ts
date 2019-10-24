import mongoose from '../config/mongoose';

export interface ISong extends mongoose.Document {
  playlist: string;
  url: string;
  addedBy: string;
  title: string;
  youtubeChannelId: string;
  youtubeChannelName: string;
  youtubeChannelUrl: string;
  length_seconds: string;
  createdAt: Date;
}

export const SongSchema = new mongoose.Schema({
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  youtubeChannelId: {
    type: String
  },
  youtubeChannelName: {
    type: String,
    required: true
  },
  youtubeChannelUrl: {
    type: String
  },
  length_seconds: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

SongSchema.index({ playlist: 1, title: 1 }, { unique: true });

export const Song = mongoose.model<ISong>('Song', SongSchema);

export default Song;
