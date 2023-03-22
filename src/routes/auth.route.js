const express = require('express');
const passport = require('passport');
const router = express.Router();
const initPassportLocal = require('../controllers/auth/passportLocal');
const {
  register,
  login,
  verifyUser,
  changePass,
} = require('../controllers/auth.controller');
const User = require('../models/user.model');

initPassportLocal();

router.post('/register', register);

router.post('/login', login);

router.put('/verify/:id', verifyUser);

router.patch('/changepass/:id', changePass);

module.exports = router;
