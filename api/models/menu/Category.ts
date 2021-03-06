import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../../interfaces';

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  disc: { type: String, required: true },
  iconData: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    line3: { type: String, required: true }
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'CategoryItem' }]
});

export default mongoose.model<ICategory>('Category', CategorySchema);
