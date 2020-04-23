const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  contacts: [String],
  conversations: [
    {
      conversationId: Schema.Types.ObjectId,
      lastMessageRead: Number
    }
  ]
});

module.exports = mongoose.model('user', UserSchema);
