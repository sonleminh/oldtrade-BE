const express = require('express');
const passport = require('passport');
const router = express.Router();
const initPassportLocal = require('../controllers/auth/passportLocal');
const {
  register,
  login,
  verifyUser,
} = require('../controllers/auth.controller');
const User = require('../models/user.model');

initPassportLocal();

router.post('/register', register);

router.post('/login', login);

router.put('/verify/:id', verifyUser);

module.exports = router;
