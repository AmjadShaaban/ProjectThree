import mongoose, { Schema } from 'mongoose';
import { IMenu } from '../interfaces/interfaces';

const MenuSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, default: '' },
  items: { type: Array, default: [] }
});

export default mongoose.model<IMenu>('Menu', MenuSchema);
