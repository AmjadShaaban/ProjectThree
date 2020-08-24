# Project PoS

Project PoS is a MERN Stack Point of Sale application for small businesses ( MVP Demo for Pizzeria ).
This MVP was built from scratch in little less than 4 weeks for my bootcamps final project.

## Writen in

### [TypeScript](https://www.typescriptlang.org/)

## Built With

#### [ReactJS](https://reactjs.org/)

- **final project requierment**
- I used newer approach to manage the state using contexts and custom hooks

  - `import React, { createContext, FC, useContext, useReducer, Dispatch } from 'react';
    - `from:`[authContext.ts](https://github.com/AmjadShaaban/ProjectThree/blob/master/client/src/contexts/auth/authContext.tsx)

#### [Material UI](https://material-ui.com/) - React Components

- Because I only had 4 weeks of time I elected Material-UI its pretty nice, fast and cut my design time in half.

#### [ExpressJS](https://expressjs.com/) - ExpressJS

- **final project requierment**
- RESTful API

#### [Socket io](https://socket.io/) - Socket io

- In Demo MVP only one socket open to allow real time kitchen order screen update

#### [JWT](https://jwt.io/) - JSON Web Token

- to achieve truly RESTful services, no sessions or cookies.
- to handle authentication and protect api routes.

#### [MongoDB](https://www.mongodb.com/) - MongoDB

- **final project requierment**
- Using MongoDB was the best option for representing hierarchical relationships, data arrays, and other complex structures in the database.
  _**(menu categories, category items, item ingredients, orders, etc... )**_
-

#### [MongooseJS](https://mongoosejs.com/) - MongoDB ODM

- [Mongoose](https://mongoosejs.com/) provides a straight-forward, schema-based solution to model the application data.

## Demo

- Hosted on [Heroku](https://p3.pos.herokuapp.com)
- Demo Account:
  - Email: test@test.test
  - Password: test123

Or

- [Register](https://p3-pos.herokuapp.com/register) a dummy account

## Authors

- **Amjad Shaaban** - _Initial work_ - [Amjad's Corner](https://amjadscorner.us)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
