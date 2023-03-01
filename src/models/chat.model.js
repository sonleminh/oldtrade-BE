const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    members: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
