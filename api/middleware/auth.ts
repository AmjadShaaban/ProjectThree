import jwt from 'jsonwebtoken';
import { Message } from '../interfaces';
import config from 'config';

export default function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    let err: Message = { message: 'Access Denied' };
    return res.status(401).json(err);
  }
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || config.get('jwtSecret')
    );
    req.user = decoded.user;
    next();
  } catch (error) {
    let err: Message = { message: 'Token is not valid' };
    res.status(401).json(err);
  }
}
