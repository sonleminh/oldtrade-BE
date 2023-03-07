const { default: mongoose } = require('mongoose');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

const getChat = async (req, res) => {
  const chatId = req.params.id;
  try {
    const chat = await Chat.findOne({
      _id: chatId,
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getChatByUser = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    }).sort({
      _id: -1,
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedChat = await newChat.save();
    return res.status(200).json(savedChat);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteChat = async (req, res) => {
  const chatId = req.params.id;
  try {
    const chatExists = await Chat.findOne({ _id: chatId });
    if (!chatExists) {
      return res.status(404).json({ message: 'Chat does not exist' });
    }

    const chat = await Chat.findByIdAndDelete(chatId);
    const messages = await Message.deleteMany({
      conversationId: req.params.id,
    });

    return res.status(200).json({ message: 'Delete chat successfully' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getChat,
  getChatByUser,
  createChat,
  deleteChat,
};
