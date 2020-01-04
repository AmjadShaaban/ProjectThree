import * as express from 'express';
import { Message } from './api/interfaces/api-interfaces';

const app = express();
const greeting: Message = { message: 'Welcome to API!' };
app.get('/', (req, res) => {
  let warning: Message = {
    message: `this is the / route of the API nothing else will happen here`
  };
  res.send(warning);
});
app.get('/api', (req, res) => {
  res.send(greeting);
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/api`);
});
server.on('error', console.error);
