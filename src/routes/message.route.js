const express = require('express');
const Message = require('../models/message.model');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
