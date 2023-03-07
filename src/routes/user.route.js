const express = require('express');
const router = express.Router();
const {
  getAllUser,
  getUser,
  updateUser,
} = require('../controllers/user.controller');

router.get('/', getAllUser);

router.get('/:id', getUser);

router.patch('/:id', updateUser);

module.exports = router;
