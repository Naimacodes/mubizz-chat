const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ConversationSchema = new Schema({
  recipients: [String],
<<<<<<< HEAD

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
=======
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
>>>>>>> refs/remotes/origin/master
});


module.exports = mongoose.model('conversations', ConversationSchema);


