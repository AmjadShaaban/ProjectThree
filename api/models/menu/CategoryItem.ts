import mongoose, { Schema } from 'mongoose';
import { ICategoryItem } from '../../interfaces';

const CategoryItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  disc: { type: String },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  iconData: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    line3: { type: String, required: true }
  },
  price: { type: Number, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

export default mongoose.model<ICategoryItem>(
  'CategoryItem',
  CategoryItemSchema
);
