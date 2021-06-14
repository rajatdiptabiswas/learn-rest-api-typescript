import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

export default IUser;
