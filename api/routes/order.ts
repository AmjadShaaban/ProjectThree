import auth from '../middleware/auth';
import Order from '../models/order/Order';
import { OrderTypes } from '../interfaces';

export function orderAPI(app) {
  app.get(
    '/api/orders',
    /*auth,*/ async (req, res) => {
      const conditions: any = {};
      switch (req.query.isOpen) {
        case 't':
          conditions.isOpen = true;
          break;
        case 'f':
          conditions.isOpen = false;
          break;
      }
      if (req.query.type) {
        switch (req.query.type.toLowerCase()) {
          case 'delivery':
            conditions.type = OrderTypes.DELIVERY;
            break;
          case 'order-in':
            conditions.type = OrderTypes.ORDER_IN;
            break;
          case 'pick-up':
            conditions.type = OrderTypes.PICKUP;
            break;
        }
      }
      try {
        let orders = await Order.find(conditions).populate({
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

  app.put('/api/orders/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
      let order = await Order.findById(id).populate({
        path: 'orderItems',
        populate: { path: 'ingredients', model: 'Ingredient' }
      });

      if (!order) {
        res.status(404).json({ msg: `order id: ${order._id} not found` });
      }

      const { isOpen } = req.body;

      let hasChanged = false;
      if (isOpen !== order.isOpen) {
        order.isOpen = isOpen;
        hasChanged = true;
      }
      if (hasChanged) {
        await order.save();
      }
      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
