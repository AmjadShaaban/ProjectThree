import mongoose, { Schema } from 'mongoose';
import { ICategoryItem } from '../../interfaces/interfaces';

const CategoryItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

export default mongoose.model<ICategoryItem>(
  'CategoryItem',
  CategoryItemSchema
);
