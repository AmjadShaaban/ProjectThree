import mongoose, { Schema } from 'mongoose';
import { IIngredient, IngredientTypes } from '../../interfaces/interfaces';

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: Object.values(IngredientTypes),
    required: true
  },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  isTopping: { type: Boolean, required: true },
  price: { type: String, default: '00.00' }
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
