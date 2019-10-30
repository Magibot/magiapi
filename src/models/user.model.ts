import mongoose from '../config/mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

import { addDaysToDate } from '../helpers/date.helper';

export const generateJwt = (payload = {}) => {
  return jwt.sign(payload, env.tokenSecret, { expiresIn: 3600 });
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10000) + 1000;
};

export interface IUser extends mongoose.Document {
  username: string;
  temporaryPassword: any;
  password: any;
  createdAt: Date;
  temporaryPasswordExpirationDate: Date;
  isValid: boolean;
  accessToken: any;

  generateTemporaryPassword: () => void;
  hideSensibleData: () => void;
  generateAccessToken: () => void;
  resetAccessToken: () => void;
  comparePassword: (password: string) => { ok?: boolean, error?: { name: string; message: string } }
}

export interface IUserModel extends mongoose.Model<IUser> {
  verifyTemporaryPassword: (user: IUser) => { isValid: boolean };
  verifyToken: (
    token: string
  ) => { user?: IUser; error?: { name: string; message: string } };
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  temporaryPassword: {
    type: String,
    select: false,
    default: generateRandomNumber
  },
  password: {
    type: String,
    select: false
  },
  accessToken: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  temporaryPasswordExpirationDate: {
    type: Date,
    default: addDaysToDate(new Date(), 3)
  },
  isValid: {
    type: Boolean,
    default: true
  }
});

// Statics methods
UserSchema.statics.verifyTemporaryPassword = async function(user: IUser) {
  if (!user.temporaryPassword) {
    return { isValid: true };
  }

  const expirationDate = new Date(user.temporaryPasswordExpirationDate);
  const now = new Date();
  if (now > expirationDate) {
    user.temporaryPassword = undefined;
    user.isValid = false;
    await user.save();
    return { isValid: false };
  }

  return { isValid: true };
};

UserSchema.statics.verifyToken = async function(token: string) {
  try {
    const decoded = jwt.verify(token, env.tokenSecret);
    if (typeof decoded === 'string') {
      return {
        error: { name: 'TokenDecodeError', message: 'Wrong type of token' }
      };
    }

    const id = (decoded as any).id;
    const user = await User.findById(id);
    if (!user) {
      return { error: { name: 'UserNotFound', message: 'User was deleted' } };
    }

    return { user };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const user = await User.findOne({ token });
      if (user) {
        await user.resetAccessToken();
      }
      return {
        error: {
          name: err.name,
          message: 'Token is expired. Please generate a new token'
        }
      };
    }

    return {
      error: {
        name: 'InvalidToken',
        message: 'Invalid token. Error on processing token'
      }
    };
  }
};

// Object methods
UserSchema.methods.generateTemporaryPassword = function() {
  (this as IUser).temporaryPassword = generateRandomNumber();
};

UserSchema.methods.hideSensibleData = function() {
  (this as IUser).password = undefined;
  (this as IUser).temporaryPassword = undefined;
  (this as IUser).accessToken = undefined;
};

UserSchema.methods.generateAccessToken = async function() {
  const id = (this as IUser).id;
  const token = (this as IUser).accessToken;
  const { user, error } = await User.verifyToken(token);

  // No need to generate a new access token
  if (user && user.id === id) {
    return;
  }

  (this as IUser).accessToken = generateJwt({ id });
  await (this as IUser).save();
};

UserSchema.methods.resetAccessToken = async function() {
  (this as IUser).accessToken = undefined;
  await (this as IUser).save();
};

UserSchema.methods.comparePassword = async function(password: string) {
  if (!(await bcrypt.compare(password, (this as IUser).password))) {
    return { error: { name: 'BadPassword', message: 'Wrong password' } };
  }

  return { ok: true };
};

// Middlewares
UserSchema.pre<IUser>('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    this.password = await bcrypt.hash(user.password, 10);
  }

  if (user.temporaryPassword && user.isModified('temporaryPassword')) {
    user.temporaryPasswordExpirationDate = addDaysToDate(new Date(), 3);
  }

  next();
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;
