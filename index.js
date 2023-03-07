const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const authRouter = require('./src/routes/auth.route');
const categoryRouter = require('./src/routes/category.route');
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

const io = require('socket.io')(9000, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('a user connected.');
  // io.emit('Welcome', 'Hi this is socket server');
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

app.use('/api', authRouter);
app.use('/api/danh-muc', categoryRouter);
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
