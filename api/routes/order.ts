import auth from '../middleware/auth';
import Order from '../models/order/Order';

export function orderAPI(app) {
  app.get(
    '/api/orders/',
    /*auth,*/ async (req, res) => {
      try {
        let orders = await Order.find({}).populate({
          path: 'orderItems',
          populate: { path: 'ingredients', model: 'Ingredient' }
        });
        if (orders) {
          return res.status(200).json({ orders });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );
  app.post('/api/orders', auth, async (req, res) => {
    try {
      let order = new Order({
        ...req.body.order,
        total: req.body.order.orderItems.reduce((accum, orderItem) => {
          return accum + orderItem.price;
        }, 0)
      });
      await order.save();
      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
