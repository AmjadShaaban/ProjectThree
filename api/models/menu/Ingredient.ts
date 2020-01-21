import mongoose, { Schema } from 'mongoose';
import { IIngredient, IngredientTypes } from '../../interfaces';

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: Object.values(IngredientTypes),
    required: true
  },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  topping: {
    type: { type: Boolean, required: true },
    price: { type: String, required: true }
  },
  price: { type: String, required: true }
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
