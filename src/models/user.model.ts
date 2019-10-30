import mongoose from '../config/mongoose';
import bcrypt from 'bcryptjs';

import { addDaysToDate } from '../helpers/date.helper';

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

  generateTemporaryPassword: () => void;
  hideSensibleData: () => void;
}

export interface IUserModel extends mongoose.Model<IUser> {
  verifyTemporaryPassword: (user: IUser) => { isValid: boolean };
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

// Object methods
UserSchema.methods.generateTemporaryPassword = function() {
  (this as IUser).temporaryPassword = generateRandomNumber();
};

UserSchema.methods.hideSensibleData = function() {
  (this as IUser).password = undefined;
  (this as IUser).temporaryPassword = undefined;
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
