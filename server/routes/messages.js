const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Message = require('../models/Message');



router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route api/messages
//@desc add new messages
//@access private
router.post(
  '/',
  [auth, [check('body', 'You have to type something').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { body } = req.body;
    try {
      const newMessage = new Message({
        from: req.user.id,
        to: req.body.to,
        body,
        date,
      });
      req.io.sockets.emit('messages', req.body.body);
      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);


module.exports = router;
