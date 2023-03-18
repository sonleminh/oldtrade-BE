const { default: mongoose } = require('mongoose');
const Category = require('../models/category.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const getAllPost = async (req, res) => {
  try {
    const postList = await Post.find({}).sort({
      _id: -1,
    });
    res.json(postList);
  } catch (error) {
    throw new Error('Not Found List Post');
  }
};

const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ _id: postId }).populate('user');

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userPostList;
  try {
    userPostList = await User.findById(userId).populate('postList');
    if (!userPostList) {
      return res.status(404).json({ message: 'No post found!' });
    }
    return res.status(200).json({ post: userPostList });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { categoryId, title, image, price, description, userId, address } =
    req.body;
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'Unable to find user by this ID' });
  }
  try {
    existsCategory = await Category.findById(categoryId);
  } catch (error) {
    return console.log(error);
  }
  if (!existsCategory) {
    return res.status(400).json({ message: 'Unable to find user by this ID' });
  }
  try {
    const newPost = new Post({
      category: categoryId,
      title,
      image,
      price,
      description,
      user: userId,
      address,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({});
    existingUser.postList.push(newPost);
    existsCategory.postList.push(newPost);
    await existingUser.save({ session });
    await existsCategory.save({ session });
    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Successful posting!',
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const postExisted = await Post.findOne({ _id: postId });
    if (!postExisted) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      message: 'Update post successfully',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const postExisted = await Post.findOne({ _id: postId });
    if (!postExisted) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    const post = await Post.findByIdAndDelete(postId)
      .populate('user')
      .populate('category');
    await post.user.postList.pull(post);
    await post.category.postList.pull(post);
    await post.user.save();
    await post.category.save();

    return res.status(200).json({ message: 'Delete post successfully' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const postList = await Post.find({ title: q });
    res.json(postList);
  } catch (error) {
    throw new Error('Not Found List Post');
  }
};

module.exports = {
  getAllPost,
  getPost,
  getByUserId,
  createPost,
  updatePost,
  deletePost,
  searchPost,
};
