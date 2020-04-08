const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
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


router.post('/', (req, res) => {
  let from = mongoose.Types.ObjectId(jwtUser.id);
  let to = mongoose.Types.ObjectId(req.body.to);

  Conversation.findOneAndUpdate(
      {
          recipients: {
              $all: [
                  { $elemMatch: { $eq: from } },
                  { $elemMatch: { $eq: to } },
              ],
          },
      },
      {
          recipients: [jwtUser.id, req.body.to],
          lastMessage: req.body.body,
          date: Date.now(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      function(err, conversation) {
          if (err) {
              console.log(err);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Failure' }));
              res.sendStatus(500);
          } else {
              let message = new Message({
                  conversation: conversation._id,
                  to: req.body.to,
                  from: jwtUser.id,
                  body: req.body.body,
              });

              req.io.sockets.emit('messages', req.body.body);

              message.save(err => {
                  if (err) {
                      console.log(err);
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ message: 'Failure' }));
                      res.sendStatus(500);
                  } else {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(
                          JSON.stringify({
                              message: 'Success',
                              conversationId: conversation._id,
                          })
                      );
                  }
              });
          }
      }
  );
});

module.exports = router;
