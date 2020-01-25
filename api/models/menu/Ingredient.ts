import mongoose, { Schema } from 'mongoose';
import { IIngredient, IngredientTypes } from '../../interfaces';

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: Object.values(IngredientTypes),
    required: true
  },
  isTopping: { type: Boolean, required: true },
  price: { type: String, required: true }
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
