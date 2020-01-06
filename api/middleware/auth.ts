import jwt from 'jsonwebtoken';
import { Message } from '../interfaces/interfaces';
import config from 'config';

export default function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    let err: Message = { message: 'Access Denied' };
    return res.status(401).json(err);
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    let err: Message = { message: 'Token is not valid' };
    res.status(401).json(err);
  }
}
