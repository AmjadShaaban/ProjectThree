import auth from '../middleware/auth';
import MenuCategory from '../models/menu/Category';
import MenuCategoryItem from '../models/menu/CategoryItem';
import { IIngredient } from '../interfaces/interfaces';
import Ingredient from '../models/menu/Ingredient';

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
      console.log({ catId: catId });
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
      console.log({ catId: catId });
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
      console.log({ catId: catId, name: name });
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
