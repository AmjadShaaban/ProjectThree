import mongoose, { Schema } from 'mongoose';
import { IUser, Roles } from '../../interfaces';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  role: { type: String, enum: Object.values(Roles), default: Roles.UNKNOWN }
});
UserSchema.virtual('fullName').get(function() {
  return `${this.fName} ${this.lName}`;
});

export default mongoose.model<IUser>('User', UserSchema);
