import mongoose, { Schema } from 'mongoose';
import { IMenuCategory } from '../interfaces/interfaces';

const MenuCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, default: '' },
  items: { type: Schema.Types.ObjectId, ref: 'MenuCategoryItem' }
});

export default mongoose.model<IMenuCategory>(
  'MenuCategory',
  MenuCategorySchema
);
