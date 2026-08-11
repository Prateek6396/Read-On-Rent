// src/controllers/authController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendEmail } = require('../utils/email');

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = new User({ name, email, password, phone });
  await user.save();

  const token = generateToken({ userId: user._id, role: user.role });

  sendEmail({
    to: user.email,
    subject: 'Welcome to Read on Rent!',
    html: `<p>Hi ${user.name}, thanks for signing up with Read on Rent 📚</p>`,
  });

  res.status(201).json({
    success: true,
    data: { token, user: user.toSafeObject() },
  });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'Account is deactivated' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken({ userId: user._id, role: user.role });

  res.json({
    success: true,
    data: { token, user: user.toSafeObject() },
  });
});

// POST /api/auth/logout
// Stateless JWT - logout is handled client-side by discarding the token.
// This endpoint exists for symmetry / future token-blacklisting support.
exports.logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /api/auth/verify
exports.verify = asyncHandler(async (req, res) => {
  // authMiddleware has already validated the token and attached req.user
  res.json({ success: true, data: { user: req.user.toSafeObject() } });
});
