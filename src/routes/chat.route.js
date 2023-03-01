const express = require('express');
const {
  getChat,
  getChatByUser,
  createChat,
} = require('../controllers/chat.controller');
const router = express.Router();

router.get('/:id', getChat);

router.get('/user/:userId', getChatByUser);

router.post('/', createChat);

module.exports = router;
