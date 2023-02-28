const express = require('express');
const router = express.Router();
const { getAllUser, getUser } = require('../controllers/user.controller');

router.get('/', getAllUser);

router.get('/:id', getUser);

module.exports = router;
