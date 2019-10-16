import mongoose from '../config/mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  password: any;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


UserSchema.pre<IUser>('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;