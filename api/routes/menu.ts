import auth from '../middleware/auth';
import Category from '../models/menu/Category';
import CategoryItem from '../models/menu/CategoryItem';
import Ingredient from '../models/menu/Ingredient';

export function menuAPI(app) {
  //Full 'GET' menu route
  app.get(
    '/api/menu',
    /*auth,*/ async (req, res) => {
      try {
        let categories = await Category.find({}).populate('items');
        if (categories) {
          return res.status(200).json({ categories });
        }
      } catch (error) {
        res.status(500).json({ error });
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
        let item = await Category.findOne({ name });
        if (item) {
          return res
            .status(500)
            .json({ msg: `item already exists ID: ${item._id}` });
        }
        item = new Category({ name });
        await item.save();
        res.status(200).json({ msg: 'success' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );
  //GET category by ID route
  app.get(
    '/api/menu/category/:catId',
    /*auth,*/ async (req, res) => {
      const { catId } = req.params;
      console.log({ catId: catId });
      try {
        let items = await Category.findOne({ _id: catId }).populate('items');
        if (items) {
          return res.status(200).json({ items });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );
  //GET category items
  app.get(
    '/api/menu/category/:catId/items',
    /*auth,*/ async (req, res) => {
      const { catId } = req.params;
      console.log({ catId: catId });
      try {
        let category = await Category.findOne({
          _id: catId
        });
        if (category.items) {
          return res.status(200).json({ category });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
  //POST add category items
  app.post(
    '/api/menu/category/items',
    /*auth,*/ async (req, res) => {
      const { catId, name, price, discription } = req.body;
      console.log({
        req: {
          body: {
            catId: catId,
            name: name,
            discription: discription,
            price: price
          }
        }
      });
      try {
        let category = await Category.findOne({ _id: catId });
        console.log(category);
        if (category) {
          let item = await CategoryItem.findOne({ name });
          if (item) {
            return res
              .status(500)
              .json({ message: `item already exists ID:${item._id}` });
          }
          item = await CategoryItem.create({ catId, name, discription, price });
          if (item._id) {
            res.status(200).json({ msg: 'success' });
            return Category.findByIdAndUpdate(
              { _id: catId },
              { $push: { items: item } },
              { new: true }
            );
          }
        }
        res.status(500).json({ message: 'error occured' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );

  app.get('/api/menu/items/', async (req, res) => {
    try {
      let allItems = await CategoryItem.find({});
      if (allItems) {
        return res.status(200).json({ allItems });
      }
    } catch (error) {
      console.log({ error });
      res.status(500).json({ error });
    }
  });

  app.get(
    '/api/menu/category/items/:itemId',
    /*auth,*/ async (req, res) => {
      const { itemId } = req.params;
      console.log({ itemId: itemId });

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

  app.get(
    '/api/menu/ingredients',
    /*auth,*/ async (req, res) => {
      try {
        let ingredients = await Ingredient.find({});
        if (ingredients) {
          return res.status(200).json({ ingredients });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  app.get(
    '/api/menu/ingredients/:ingredientId',
    /*auth,*/ async (req, res) => {
      const { ingredientId } = req.params;
      try {
        let ingredient = await Ingredient.findOne({ _id: ingredientId });
        if (ingredient) {
          return res.status(200).json({ ingredient });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  app.post(
    '/api/menu/ingredients',
    /*auth,*/ async (req, res) => {
      const { name, type, isTopping } = req.body;
      console.log({
        ingredient: {
          name: name,
          type: type,
          isTopping: isTopping
        }
      });
      try {
        let ingredient = await Ingredient.findOne({ name });
        if (ingredient) {
          return res
            .status(500)
            .json({ msg: `ingredient already exists ID: ${ingredient._id}` });
        }
        ingredient = new Ingredient({ name, type, isTopping });
        await ingredient.save();
        res.status(200).json({ msg: 'success' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );
}
