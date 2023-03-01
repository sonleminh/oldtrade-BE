const { default: mongoose } = require('mongoose');
const Message = require('../models/message.model');

const getMessageByChat = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getLastMessageByChat = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).sort({
      _id: -1,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMessageByChat,
  getLastMessageByChat,
  sendMessage,
};
