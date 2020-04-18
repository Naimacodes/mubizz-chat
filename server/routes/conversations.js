const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

//test route
router.get('/test', (req, res) => {
  res.send('test route');
});


//@route api/messages
//@desc get list of all the conversations of a user
//@access private

router.get('/', auth, async (req, res) => {
  
  try {
    
    
    let user = await User.findOne({_id : req.user.id});
    // console.log(user);
    // Get user's conversations.
    const conversationIds = user.conversations.map(
      (conversation) => conversation.conversationId
    );
    const conversations = await Conversation.find({
      _id: { $in: conversationIds },
    });
    

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
    const conversation = await Conversation.findOne({ recipients });

    if (conversation) return res.status(400).end();

    const newConversation = new Conversation({ recipients });
    await newConversation.save();

    const conversationInfo = {
      conversationId: newConversation._id,
      lastMessageRead: 0,
    };
    await User.updateMany(
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
    res.status(500).end();
  }
});

// @route   POST /api/conversations/messages
// @access  private
// Add a message to a specific conversation and emit message to connected clients.

router.post('/messages', auth, async (req, res) => {
  const io = req.app.locals.io;
  try {
    const { _id, message, date } = req.body;

    await Conversation.findByIdAndUpdate(
      _id,
      { $push: { messages: message } },
      { new: true }
    );

    // emits message to connected clients.
    const data = { _id, message, date  };
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

module.exports = router;
