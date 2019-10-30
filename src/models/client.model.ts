import mongoose from '../config/mongoose';
import validator from 'validator';

export interface IClient extends mongoose.Document {
  name: string;
  usage: string;
  description: string;
  contactEmail: string;
}

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  usage: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  contactEmail: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ClientSchema.path('contactEmail').validate(function(value: string) {
  return validator.isEmail(value);
}, 'Invalid email');

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;
