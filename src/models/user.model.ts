import mongoose from '../config/mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

import { addDaysToDate } from '../helpers/date.helper';

export const generateJwt = (payload = {}) => {
  return jwt.sign(payload, env.tokenSecret, {
    expiresIn: env.tokenExpirationTime
  });
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10000) + 1000;
};

export interface IUser extends mongoose.Document {
  username: string;
  password: any;
  createdAt: Date;
  passwordExpirationDate: any;
  isValidated: boolean;
  accessToken: any;

  generateTemporaryPassword: () => number;
  hideSensibleData: () => void;
  generateAccessToken: () => string;
  resetAccessToken: () => void;
  checkPassword: (
    password: string
  ) => { ok?: boolean; error?: { name: string; message: string } };
}

export interface IUserModel extends mongoose.Model<IUser> {
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
  passwordExpirationDate: {
    type: Date,
    default: addDaysToDate(new Date(), env.daysToExpireTemporaryPassword)
  },
  isValidated: {
    type: Boolean,
    default: false
  }
});

// Statics methods
UserSchema.statics.verifyToken = async function(token: string) {
  try {
    if (!(await User.findOne({ accessToken: token }).select('+accessToken'))) {
      return {
        error: {
          name: 'TokenAuthenticationError',
          message: 'User is not authenticated'
        }
      };
    }

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
      const user = await User.findOne({ accessToken: token }).select(
        '+accessToken'
      );
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
UserSchema.methods.generateTemporaryPassword = async function() {
  const user = this as IUser;
  user.password = generateRandomNumber();
  return user.password;
};

UserSchema.methods.hideSensibleData = function() {
  (this as IUser).password = undefined;
  (this as IUser).accessToken = undefined;
};

UserSchema.methods.generateAccessToken = async function() {
  const id = (this as IUser).id;
  const token = (this as IUser).accessToken;
  const { user, error } = await User.verifyToken(token);

  // No need to generate a new access token
  if (user && user.id === id) {
    return user.accessToken;
  }

  (this as IUser).accessToken = generateJwt({ id });
  return (this as IUser).accessToken;
};

UserSchema.methods.resetAccessToken = async function() {
  (this as IUser).accessToken = undefined;
  await (this as IUser).save();
};

UserSchema.methods.checkPassword = async function(password: string) {
  const user = this as IUser;
  const expirationDate = new Date(user.passwordExpirationDate);
  const now = new Date();
  if (!user.isValidated) {
    if (now > expirationDate) {
      user.password = undefined;
      await user.save();
      return {
        error: {
          name: 'PasswordExpired',
          message: 'Temporary password expired. Please reset your password'
        }
      };
    }

    if (password !== user.password) {
      return { error: { name: 'InvalidPassword', message: 'Wrong password' } };
    }

    return { ok: true };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return { error: { name: 'InvalidPasswor', message: 'Wrong password' } };
  }

  return { ok: true };
};

// Middlewares
UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    if (!this.isValidated) {
      this.passwordExpirationDate = addDaysToDate(new Date(), env.daysToExpireTemporaryPassword);
    } else {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  next();
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;
