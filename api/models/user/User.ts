import mongoose, { Schema } from 'mongoose';
import { IUser, Roles } from '../../interfaces';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: Object.values(Roles), default: Roles.ADMIN }
  },
  { timestamps: true }
);
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model<IUser>('User', UserSchema);
