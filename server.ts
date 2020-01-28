import cors from 'cors';
import express from 'express';
import SocketIO from 'socket.io';
import { createServer } from 'http';
import logger from 'morgan';
import { Message } from './api/interfaces';
import { authAPI } from './api/routes/auth';
import { usersAPI } from './api/routes/users';
import { menuAPI } from './api/routes/menu';
import { orderAPI } from './api/routes/order';
import { connectDB } from './config/db';
import { addSocket } from './api/services/socketManager';
import path from 'path';

const PORT: string = process.env.PORT || '3333';
const app = express();
const http = createServer(app);
const io = SocketIO(http);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}

io.on('connection', addSocket);
app.use(express.static(path.join(__dirname, 'client/build')));
const greeting: Message = { message: 'Welcome to API!' };
app.get('/api', (req, res) => {
  res.send(greeting);
});
authAPI(app);
usersAPI(app);
menuAPI(app);
orderAPI(app);

const server = http.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
server.on('error', console.error);
