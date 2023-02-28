const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = mongoose.Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const postSchema = new Schema(
  {
    category: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    image: [imgSchema],
    price: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    address: {
      addressDetail: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
