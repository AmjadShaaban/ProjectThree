import mongoose, { Schema } from 'mongoose';
import { IIngredient } from '../../interfaces/interfaces';

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ['cheese', 'meat', 'vegetable', 'other'],
    required: true
  },
  isTopping: { type: Boolean, required: true }
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
