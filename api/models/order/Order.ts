import mongoose, { Schema } from 'mongoose';
import { IOrder, OrderTypes } from '../../interfaces';

const OrderSchema = new Schema(
  {
    type: { type: String, enum: Object.values(OrderTypes), required: true },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'CategoryItem' }],
    total: { type: String, required: true },
    customerName: { type: String },
    customerPhone: { type: String },
    customerAddress: { type: String },
    isOpen: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
