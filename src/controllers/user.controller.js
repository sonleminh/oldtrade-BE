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

module.exports = {
  getAllUser,
  getUser,
};
