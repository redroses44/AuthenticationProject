import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: string;
  email: string;
  password: string;
  createdAt: Date;
}
