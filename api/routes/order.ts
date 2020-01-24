import auth from '../middleware/auth';
import Order from '../models/order/Order';
import { IOrder, IDelivery, IOrderIn, IPickup } from '../interfaces/index';

export function orderAPI(app) {
  app.get('/api/orders/delivery/:date', auth, async (req, res) => {
    const { date } = req.params;
    const date2 = date + 1;
    try {
      let orders = await Order.find({
        created_on: { $gte: new Date(date), $lt: new Date(date2) }
      }).populate('orderItems');
      if (orders) {
        return res.status(200).json({ orders });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  app.post('/api/orders/new', auth, async (req, res) => {
    const {
      type,
      orderItems,
      total,
      customerName,
      customerPhone,
      customerAddress
    } = req.body;
    try {
      let order = new Order({
        type,
        orderItems,
        total,
        customerName,
        customerPhone,
        customerAddress
      });
      await order.save();
      res.status(200).json({ msg: 'success' });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
