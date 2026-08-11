// src/controllers/userController.js
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/users/profile (auth required)
exports.getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user.toSafeObject() });
});

// PUT /api/users/profile (auth required)
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = { ...user.address, ...address };

  await user.save();
  res.json({ success: true, data: user.toSafeObject() });
});

// PUT /api/users/password (auth required)
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Password updated successfully' });
});
