import auth from '../middleware/auth';
import MenuCategory from '../models/MenuCategory';
import MenuCategoryItem from '../models/MenuCategoryItem';
import Ingredient from '../models/Ingredient';

export function menuAPI(app) {
  //Full 'GET' menu route
  app.get(
    '/api/menu',
    /*auth,*/ async (req, res) => {
      try {
        let items = await MenuCategory.find({});
        if (items) {
          return res.status(200).json({ items });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
  //Add 'POST' Category route
  app.post(
    '/api/menu',
    /*auth,*/ async (req, res) => {
      const { name } = req.body;
      console.log(name);
      try {
        let item = await MenuCategory.findOne({ name });
        if (item) {
          return res
            .status(500)
            .json({ msg: `item already exists ID: ${item._id}` });
        }
        item = new MenuCategory({ name });
        await item.save();
        res.status(200).json({ msg: 'success' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );

  app.get(
    '/api/menu/category/:catId',
    /*auth,*/ async (req, res) => {
      const { catId } = req.params;
      try {
        let items = await MenuCategory.findOne({ _id: catId });
        if (items) {
          return res.status(200).json({ items });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );

  app.get(
    '/api/menu/category/:catId/items',
    /*auth,*/ async (req, res) => {
      const { catId } = req.params;
      try {
        let category = await MenuCategory.findOne({
          _id: catId
        }).populate('MenuCategoryItem');
        if (category.items) {
          return res.status(200).json({ category });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  app.post(
    '/api/menu/category/:catId/items',
    /*auth,*/ async (req, res) => {
      const { catId } = req.body.params;
      const { name } = req.body;
      console.log(name);
      try {
        let category = await MenuCategory.findOne({ _id: catId });
        if (category.items) {
          let item = await MenuCategoryItem.findOne({ name });
          if (item) {
            return res
              .status(500)
              .json({ message: `item already exists ID:${item._id}` });
          }
          item = await MenuCategoryItem.create({ name });
          if (item._id) {
            return MenuCategory.findByIdAndUpdate(
              { _id: catId },
              { $push: { items: item } },
              { new: true }
            );
          }
          res.status(200).json({ msg: 'success' });
        }
        res.status(500).json({ message: 'error occured' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );

  app.get(
    '/api/menu/category/items/:itemId',
    /*auth,*/ async (req, res) => {
      const { itemId } = req.params;
      try {
        let item = await Ingredient.findOne({
          _id: itemId
        });
        if (item) {
          return res.status(200).json({ item });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
}
