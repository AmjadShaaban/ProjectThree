import auth from '../middleware/auth';

export function menuAPI(app) {
  app.get(
    '/api/menu',
    /*auth,*/ (req, res) => {
      try {
        const categories = [
          {
            id: 0,
            title: 'Pizzas',
            subCat: 'ID of mongoDB'
          },
          { id: 1, title: 'Cat 2', subCat: false },
          { id: 2, title: 'Cat 3', subCat: true },
          { id: 3, title: 'Cat 4', subCat: false },
          { id: 4, title: 'Cat 5', subCat: false }
        ];
        setTimeout(() => {
          res.json({ categories });
        }, 4000);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  app.get(
    '/api/menu/:categoryId',
    /*auth,*/ (req, res) => {
      try {
        const categoryItems = [
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
        setTimeout(() => {
          res.json({ categoryItems });
        }, 4000);
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
