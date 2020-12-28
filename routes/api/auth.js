const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ErrorResponse = require('./utils/errorResponse');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route     GET api/auth
// @desc      Get user route
// @access    Public
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // leaving off the password
    res.json(user);
  } catch (err) {
    return next(new ErrorResponse('Cannot login', 500));
  }
});

// @route     POST api/auth
// @desc      Authenticate user & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { email, password } = req.body;
    const r = require('dotenv');
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }

      // Return jsonwebtoken, is user registers, he is logged in automatically
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
