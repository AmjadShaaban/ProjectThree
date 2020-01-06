import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/interfaces';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: false },
  lName: { type: String, required: false },
  admin: { type: Boolean, default: false, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
