const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/sendmail');

router.post('/send', sendEmail);

module.exports = router;
