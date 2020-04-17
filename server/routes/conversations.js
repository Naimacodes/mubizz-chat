const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
<<<<<<< HEAD
const User = require('../models/User');

//test route
router.get('/test', (req, res) => {
  res.send('test route');
});

=======
>>>>>>> refs/remotes/origin/master

//@route api/messages
//@desc get list of all the conversations of a user
//@access private
<<<<<<< HEAD

router.get('/', auth, async (req, res) => {
  try {
    const { userid } = req.user.id;

    // Get user.
    const user = await User.findOne({ userid });

    // Get user's conversations.
=======
router.get('/', auth, async (req, res) => {
  try {
    const { user } = req;
    const user = await User.findOne({ user });

>>>>>>> refs/remotes/origin/master
    const conversationIds = user.conversations.map(
      (conversation) => conversation.conversationId
    );
    const conversations = await Conversation.find({
      _id: { $in: conversationIds },
    });

<<<<<<< HEAD
    const conversationsWithInfo = conversations.map((conversation, index) => ({
      ...conversation._doc,
      lastMessageRead: user.conversations[index].lastMessageRead,
    }));

    // Respond with conversations.
    res.json(conversationsWithInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

// @route   POST /api/conversations
// @ desc Create a new conversation with recipients
// @access  private

router.post('/', auth, async (req, res) => {
  const io = req.app.locals.io;
  try {
    const recipients = req.body.recipients;
=======
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route api/messages/conversations
//@desc add message to an existing conversation
//@access private

router.post('/', auth, async (req, res) => {
  try {
    const recipients = req.body;

>>>>>>> refs/remotes/origin/master
    const conversation = await Conversation.findOne({ recipients });

    if (conversation) return res.status(400).end();

    const newConversation = new Conversation({ recipients });
    await newConversation.save();

    const conversationInfo = {
      conversationId: newConversation._id,
      lastMessageRead: 0,
    };
    await User.updateMany(
<<<<<<< HEAD
      { name: { $in: recipients } },
      { $addToSet: { conversations: conversationInfo } }
    );

    // Emits conversation to connected clients.
    const newConversationWithInfo = {
      ...newConversation._doc,
      lastMessageRead: 0,
    };
    io.emit('conversation', newConversationWithInfo);

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        message: 'Success',
      })
    );
  } catch (err) {
    console.error(err.message);
=======
      { username: { $in: recipients } },
      { $addToSet: { conversations: conversationInfo } }
    );

    res.end();
  } catch (err) {
>>>>>>> refs/remotes/origin/master
    res.status(500).end();
  }
});

<<<<<<< HEAD
// @route   POST /api/conversations/messages
// @access  private
// Add a message to a specific conversation and emit message to connected clients.

router.post('/messages', auth, async (req, res) => {
  const io = req.app.locals.io;
  try {
    const { _id, message } = req.body;

    await Conversation.findByIdAndUpdate(
      _id,
      { $push: { messages: message } },
      { new: true }
    );

    // emits message to connected clients.
    const data = { _id, message };
    io.emit('message', data);

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        message: 'Success',
      })
    );
  } catch (err) {
    console.error(err.message);
    res.status(400).end();
  }
});

=======
>>>>>>> refs/remotes/origin/master
module.exports = router;
