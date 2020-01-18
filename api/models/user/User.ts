import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../interfaces/interfaces';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  employee: { type: Boolean, default: false, required: true },
  driver: { type: Boolean, default: false, required: true },
  manager: { type: Boolean, default: false, required: true },
  admin: { type: Boolean, default: false, required: true }
});
UserSchema.virtual('fullName').get(function() {
  return `${this.fName} ${this.lName}`;
});

export default mongoose.model<IUser>('User', UserSchema);
