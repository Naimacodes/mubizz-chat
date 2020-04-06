const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

// GET All Messages
router.get('/test', (req, res) => {
  res.send('message route');
});

// GET all Messages
router.get('/', (req, res) => {
  Message.find({}, (err, message) => {
    res.send(messages);
  });
});

// POST new message
router.post('/', (req, res) => {
  let message = new Message(req.body);
  message.save(err => {
    if (err) sendStatus(500);
    res.sendStatus(200);
  });
});

module.exports = router;