import mongoose, { Schema } from 'mongoose';
import { ISpecial } from '../../interfaces';

const SpecialSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, default: 'https://via.placeholder.com/150' },
  disc: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'SpecialItem' }]
});

export default mongoose.model<ISpecial>('Special', SpecialSchema);
