import mongoose, { Schema } from 'mongoose';
import { ISpecialItem } from '../../interfaces';

const SpecialItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  disc: { type: String },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  price: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'CategoryItem' }]
});

export default mongoose.model<ISpecialItem>('SpecialItem', SpecialItemSchema);
