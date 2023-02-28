const express = require('express');
const Conversation = require('../models/conversation.model');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
