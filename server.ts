import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import { Message } from './api/interfaces';
import { authAPI } from './api/routes/auth';
import { usersAPI } from './api/routes/users';
import { menuAPI } from './api/routes/menu';
import { orderAPI } from './api/routes/order';
import { connectDB } from './config/db';
import path from 'path';

const PORT: string = process.env.PORT || '3333';
const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use(express.static(path.join(__dirname, 'client/build')));
const greeting: Message = { message: 'Welcome to API!' };
app.get('/api', (req, res) => {
  res.send(greeting);
});
authAPI(app);
usersAPI(app);
menuAPI(app);
orderAPI(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
server.on('error', console.error);
