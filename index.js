const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const postRouter = require('./src/routes/post.route');
const uploadRouter = require('./src/routes/upload.route');
const chat = require('./src/routes/chat.route');
const message = require('./src/routes/message.route');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

const uri = process.env.MONGO_DB;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connection successfully');
});

app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api', uploadRouter);
app.use('/api/chat', chat);
app.use('/api/message', message);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Old Trade API.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
});
