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
    required: true,
    unique: true
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
  if (user.isModified('password')) {
    this.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
