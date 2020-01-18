import mongoose, { Schema } from 'mongoose';
import { ICategoryItem } from '../../interfaces/interfaces';

const CategoryItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  disc: { type: String },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  price: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

export default mongoose.model<ICategoryItem>(
  'CategoryItem',
  CategoryItemSchema
);
