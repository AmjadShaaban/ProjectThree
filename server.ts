import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import { Message } from './api/interfaces/interfaces';
import { authAPI } from './api/routes/auth';
import { usersAPI } from './api/routes/users';
import { menuAPI } from './api/routes/menu';
import { connectDB } from './config/db';

const PORT: string = process.env.PORT || '3333';
const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
const greeting: Message = { message: 'Welcome to API!' };
app.get('/', (req, res) => {
  let warning: Message = {
    message: `this is the / route of the API some nothing else will happen here`
  };
  res.send(warning);
});
app.get('/api', (req, res) => {
  res.send(greeting);
});
authAPI(app);
usersAPI(app);
menuAPI(app);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/api`);
});
server.on('error', console.error);
