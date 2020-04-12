const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.get("/test", (req, res) => { res.send('test route'); });


//@route /api/users
//@desc Register a user.
//@access Public.

router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'user already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);


// @route   GET /api/users/search/:name
// @desc search database for user, if user exists, respond with { name }
// @access  private

router.get('/search/:name', auth, async (req, res) => {
  try {
    const { name } = req.params
    const user = await User.findOne({ name });

    if (!user) return res.send('no user with that name exists').end();

    return res.json({ name });
  } catch (err) {
    res.status(500).send('server error');
  }
});


// @route   POST /api/users/contacts
// @access  private
// Add a certain user to current user's contacts.
router.post('/contacts', auth, async (req, res) => {
  try {
    const { username } = req
    const { userToAdd } = req.body;
    
    const query = await User.updateOne(
      { username }, 
      { $addToSet: { contacts: userToAdd } }
    );

    
    if (!query.n) return res.status(400).end();
 
    res.end();

  } catch (err) {
    res.status(500).end();
  }
});




module.exports = router;
