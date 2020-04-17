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
      date: Date,
    },
  ],
});


module.exports = mongoose.model('conversations', ConversationSchema);


