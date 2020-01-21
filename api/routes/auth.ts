import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user/User';
import { Message } from '../interfaces';
import auth from '../middleware/auth';
import config from 'config';
export function authAPI(app) {
  // @route  GET  api/auth
  // @desc   Gets Logged in user
  // @access PRIVATE

  app.get('/api/auth', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      let err: Message = { message: error };
      res.status(500).json(err);
    }
  });
  // @route  POST api/auth
  // @Desc   Get logged in user
  // @Access PUBLIC

  app.post(
    '/api/users/login',
    [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: { errors: errors.array() } });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          let err: Message = { message: 'Username not found' };
          return res.status(400).json(err);
        }
        const isMAtch = await bcrypt.compare(password, user.password);
        if (!isMAtch) {
          let err: Message = { message: 'Incorrect Password' };
          return res.status(400).json(err);
        }
        const payload = {
          user: {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            role: user.role
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              user: {
                token,
                fullName: user.fullName,
                role: user.role
              }
            });
          }
        );
      } catch (error) {
        let err: Message = { message: error };
        res.status(500).json(err);
      }
    }
  );
}
