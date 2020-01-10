import mongoose, { Schema } from 'mongoose';
import { IMenuItem } from '../interfaces/interfaces';

const MenuItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  ingredients:{type:Array,required:true}
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
