import auth from '../middleware/auth';
import Category from '../models/menu/Category';
import CategoryItem from '../models/menu/CategoryItem';
import Ingredient from '../models/menu/Ingredient';
import SpecialItem from '../models/menu/SpecialItem';
export function menuAPI(app) {
  //Specials GET
  app.get('/api/menu/specials', auth, async (req, res) => {
    try {
      const specials = await SpecialItem.find({}).populate('items');
      if (specials) {
        return res.status(200).json({ specials });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  //Full 'GET' menu route
  app.get('/api/menu', auth, async (req, res) => {
    try {
      let categories = await Category.find({}).populate({
        path: 'items',
        populate: { path: 'ingredients', model: Ingredient }
      });
      if (categories) {
        return res.status(200).json({ categories });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  //Add 'POST' Category route
  app.post('/api/menu', auth, async (req, res) => {
    const { name, disc, iconLine1, iconLine2, iconLine3 } = req.body;
    try {
      let item = await Category.findOne({ name });
      if (item) {
        return res
          .status(500)
          .json({ msg: `item already exists ID: ${item._id}` });
      }
      item = new Category({
        name,
        disc,
        iconData: { line1: iconLine1, line2: iconLine2, line3: iconLine3 },
        items: []
      });
      await item.save();
      return res.status(200).json({ item });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  //GET category by ID route
  app.get('/api/menu/category/:catId', auth, async (req, res) => {
    const { catId } = req.params;
    try {
      let items = await Category.findOne({ _id: catId }).populate('items');
      if (items) {
        return res.status(200).json({ items });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  //GET category items
  app.get('/api/menu/category/:catId/items', auth, async (req, res) => {
    const { catId } = req.params;
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
  });
  // POST Specials items
  app.post('/api/menu/specials/', auth, async (req, res) => {
    const {
      name,
      disc,
      iconLine1,
      iconLine2,
      iconLine3,
      price,
      items
    } = req.body;
    try {
      let specialItem = await SpecialItem.findOne({ name });
      if (specialItem) {
        return res
          .status(500)
          .json({ message: `item already exists ID:${specialItem._id}` });
      }
      specialItem = new SpecialItem({
        name,
        disc,
        iconData: { line1: iconLine1, line2: iconLine2, line3: iconLine3 },
        price,
        items
      });
      await specialItem.save();
      return res.status(200).json({ specialItem });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  //POST add category items
  app.post('/api/menu/category/items', auth, async (req, res) => {
    const {
      catId,
      name,
      price,
      disc,
      iconLine1,
      iconLine2,
      iconLine3,
      ingredients
    } = req.body;
    try {
      let category = await Category.findOne({ _id: catId });
      if (category) {
        let item = await CategoryItem.findOne({ name });
        if (item) {
          return res
            .status(500)
            .json({ message: `item already exists ID:${item._id}` });
        }
        item = await CategoryItem.create({
          catId,
          name,
          disc,
          iconData: { line1: iconLine1, line2: iconLine2, line3: iconLine3 },
          ingredients,
          price
        });
        if (item._id) {
          await Category.findByIdAndUpdate(
            { _id: catId },
            { $push: { items: item } },
            { new: true }
          );
          return res.status(200).json({ category });
        }
      }
      res.status(500).json({ message: 'error occured' });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/api/menu/items/', auth, async (req, res) => {
    try {
      let items = await CategoryItem.find({});
      if (items) {
        return res.status(200).json({ items });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/api/menu/category/items/:itemId', auth, async (req, res) => {
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
  });

  app.get('/api/menu/ingredients', auth, async (req, res) => {
    try {
      let ingredients = await Ingredient.find({});
      if (ingredients) {
        return res.status(200).json({ ingredients });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get('/api/menu/ingredients/:ingredientId', auth, async (req, res) => {
    const { ingredientId } = req.params;
    try {
      let ingredient = await Ingredient.findOne({ _id: ingredientId });
      if (ingredient) {
        return res.status(200).json({ ingredient });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post('/api/menu/ingredients', auth, async (req, res) => {
    const { name, type, isTopping, price } = req.body;
    try {
      let ingredient = await Ingredient.findOne({ name });
      if (ingredient) {
        return res
          .status(500)
          .json({ msg: `ingredient already exists ID: ${ingredient._id}` });
      }
      ingredient = new Ingredient({ name, type, isTopping, price });
      await ingredient.save();
      res.status(200).json({ ingredient });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
}
