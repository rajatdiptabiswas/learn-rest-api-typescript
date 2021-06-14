import { model, Schema } from 'mongoose';
import validator from 'validator';
import IUser from '../interfaces/user';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, 'Password must be at least 8 characters long'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
