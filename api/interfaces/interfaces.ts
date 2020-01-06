import { Document } from 'mongoose';

export interface Message {
  message: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  fName?: string;
  lName?: string;
  admin: boolean;
}
