const User = require('../models/user.model');
const getAllUser = async (req, res) => {
  try {
    const userList = await User.find({});
    res.json(userList);
  } catch (error) {
    throw new Error('Not Found List User');
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userExisted = await User.findOne({ _id: userId });
    if (!userExisted) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const post = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      message: 'Update user successfully',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getAllUser,
  getUser,
  updateUser,
};
