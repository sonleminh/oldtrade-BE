const express = require('express');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const GOOGLE_MAILER_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = 'lms.smile2000@gmail.com';
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendEmail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    if (!email) throw new Error('Please provide email, subject and content!');
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const mailOptions = {
      to: email,
      subject: subject,
      html: content,
    };
    await transport.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
};

module.exports = { sendEmail };
