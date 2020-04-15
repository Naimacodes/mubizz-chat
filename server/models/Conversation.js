const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  recipients: [String],
  lastMessage: {
    type: String,
  },
  messages: [
    {
      user: String,
      body: String,
      date: Date.now()
    }
  ]
});

module.exports = mongoose.model('conversations', ConversationSchema);
