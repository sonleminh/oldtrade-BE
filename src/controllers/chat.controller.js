const { default: mongoose } = require('mongoose');
const Chat = require('../models/chat.model');

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

module.exports = {
  getChat,
  getChatByUser,
  createChat,
};
