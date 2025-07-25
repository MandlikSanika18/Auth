const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register (optional)
exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10);

    user.resetToken = hash;
    user.resetTokenExpire = Date.now() + 36000000; // 1 hour
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}?id=${user._id}`;
    await sendEmail(email, 'Reset Your Password', `Click <a href="${resetLink}">here</a> to reset your password.`);

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { id, token, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user || !user.resetToken || !user.resetTokenExpire) {
      return res.status(400).json({ error: 'Invalid or expired link' });
    }

    const isValid = await bcrypt.compare(token, user.resetToken);
    if (!isValid || user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Reset failed' });
  }
};
