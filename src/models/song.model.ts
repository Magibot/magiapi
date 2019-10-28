import mongoose from '../config/mongoose';
import Playlist from './playlist.model';

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
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild',
    required: true
  },
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
  lengthSeconds: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

SongSchema.index({ playlist: 1, title: 1, guild: 1 }, { unique: true });

SongSchema.pre('save', async function(next) {
  const song = this as ISong;
  await Playlist.findByIdAndInsertSong(song.playlist, song);
  next();
});

SongSchema.pre('remove', async function(next) {
  const song = this as ISong;
  await Playlist.findByIdAndRemoveSong(song.playlist, song.id);
  next();
});

export const Song = mongoose.model<ISong>('Song', SongSchema);

export default Song;
