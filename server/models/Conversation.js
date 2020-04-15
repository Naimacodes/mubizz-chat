const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  recipients: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  lastMessage: {
    type: String,
  },
  messages: [
    {
      user: String,
      body: String,
      date: Date.now()
    }
  ],
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('conversations', ConversationSchema);
