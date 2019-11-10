import bcryptjs from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  facebookId: String,
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    required: [true, 'Email is required']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    //required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(this: IUser, next) {
  const salt = await bcryptjs.genSalt();
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, salt);
});

export const User = mongoose.model<IUser>('User', UserSchema);
