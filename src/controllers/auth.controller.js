const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    let emailExisted = await User.findOne({ email });
    if (emailExisted) {
      return res.status(400).json({ message: 'This email already exists' });
    }
    const phoneExisted = await User.findOne({ phone });
    if (phoneExisted) {
      return res
        .status(400)
        .json({ message: 'This phone number already exists' });
    }
    const newUser = new User({
      name,
      phone,
      email,
      password: await bcrypt.hash(password, 10),
      verified: false,
      postList: [],
    });

    await newUser.save();
    res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) throw err;
    if (!user) res.json({ message: 'Email or password is incorrect' });

    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
};

const verifyUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.verified = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
};

module.exports = {
  register,
  login,
  verifyUser,
};
