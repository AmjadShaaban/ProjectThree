import mongoose, { Schema } from 'mongoose';
import { IMenuCategoryItem } from '../interfaces/interfaces';

const MenuCategoryItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  ingredients: { type: Schema.Types.ObjectId, ref: 'Ingredient' }
});

export default mongoose.model<IMenuCategoryItem>(
  'MenuCategoryItem',
  MenuCategoryItemSchema
);
