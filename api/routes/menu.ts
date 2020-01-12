import auth from '../middleware/auth';
import Menu from '../models/Menu';
import MenuItems from '../models/MenuItem';
import Ingredients from '../models/Ingredients';

export function menuAPI(app) {
  app.get(
    '/api/menu',
    /*auth,*/ async (req, res) => {
      try {
        let items = await Menu.find({});
        if (items) {
          return res.status(200).json({ items });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  app.post(
    '/api/menu',
    /*auth,*/ async (req, res) => {
      const { name } = req.body;
      console.log(name);
      try {
        let item = await Menu.findOne({ name });
        if (item) {
          return res
            .status(500)
            .json({ msg: `item already exists ID: ${item._id}` });
        }
        item = new Menu({ name });
        await item.save();
        res.status(200).json({ msg: 'success' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );

  app.get(
    '/test/top',
    /*auth,*/ async (req, res) => {
      try {
        let ing = await Ingredients.find({});
        if (ing) {
          return res.status(200).json({ ing });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  );

  app.get(
    '/api/menu/:categoryId',
    /*auth,*/ (req, res) => {
      try {
        const items = [
          {
            id: 0,
            title: `${req.params.categoryId} Pizzas`,
            subCat: 'ID of mongoDB'
          },
          { id: 1, title: 'Cat 2', subCat: false },
          { id: 2, title: 'Cat 3', subCat: true },
          { id: 3, title: 'Cat 4', subCat: false },
          { id: 4, title: 'Cat 5', subCat: false }
        ];

        res.json({ items });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
}

// const cats = [
//     {
//         id: 1,
//         name: 'pizzas',
//         items: [
//             {
//                 id: 1,
//                 name: 'pepp pizza',
//                 price: 10,
//             },
//             {
//                 id: 2,
//                 name: 'hawaiian pizza',
//                 price: 10,
//             },
//         ]
//     },
//     {
//         id: 2,
//         name: 'burgers',
//     },
//     {
//         id: 3,
//         name: 'wings',
//     },
// ]
