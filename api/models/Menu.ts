import mongoose, { Schema } from 'mongoose';
import { IMenu } from '../interfaces/interfaces';

const MenuSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img:{type:String},
  items: { type:Array}
});

export default mongoose.model<IMenu>('Menu', MenuSchema);



