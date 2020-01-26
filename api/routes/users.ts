import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user/User';
import config from 'config';

export function usersAPI(app) {
  // @route   POST  api/users
  // @Desc    Register a user
  // @access  Public

  app.post(
    '/api/users/register',
    [
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 ore more characters'
      ).isLength({ min: 6 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { firstName, lastName, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'already exists' });
        }
        user = new User({
          firstName,
          lastName,
          email,
          password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET || config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
              }
            });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    }
  );
}
