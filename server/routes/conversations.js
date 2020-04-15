const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');

//@route api/messages
//@desc get list of all the conversations of a user
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const { user } = req;
    const user = await User.findOne({ user });

    const conversationIds = user.conversations.map(
      (conversation) => conversation.conversationId
    );
    const conversations = await Conversation.find({
      _id: { $in: conversationIds },
    });

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

    const conversation = await Conversation.findOne({ recipients });

    if (conversation) return res.status(400).end();

    const newConversation = new Conversation({ recipients });
    await newConversation.save();

    const conversationInfo = {
      conversationId: newConversation._id,
      lastMessageRead: 0,
    };
    await User.updateMany(
      { username: { $in: recipients } },
      { $addToSet: { conversations: conversationInfo } }
    );

    res.end();
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
