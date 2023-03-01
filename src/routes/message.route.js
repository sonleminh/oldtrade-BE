const express = require('express');
const {
  getMessageByChat,
  getLastMessageByChat,
  sendMessage,
} = require('../controllers/message.controller');
const router = express.Router();

router.get('/:id', getMessageByChat);

router.get('/last/:id', getLastMessageByChat);

router.post('/', sendMessage);

module.exports = router;
