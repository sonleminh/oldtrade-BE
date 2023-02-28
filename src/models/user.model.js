const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: Number, required: true },
  user: { type: String, required: true },
});

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    require: true,
  },
  postList: [{ type: mongoose.Types.ObjectId, ref: 'Post', require: true }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
