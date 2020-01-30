import mongoose, { Schema } from 'mongoose';
import { ISpecialItem } from '../../interfaces';

const SpecialItemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  disc: { type: String, required: true },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  iconData: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    line3: { type: String, required: true }
  },
  price: { type: Number, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'CategoryItem' }]
});

export default mongoose.model<ISpecialItem>('SpecialItem', SpecialItemSchema);
