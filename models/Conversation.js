const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  recipients: [String],

  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      url: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('conversations', ConversationSchema);
