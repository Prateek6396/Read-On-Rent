// src/middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Verifies the JWT on the Authorization header and attaches the
 * authenticated user to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * Restricts a route to admin-role users only. Must run after authMiddleware.
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

module.exports = authMiddleware;
module.exports.authMiddleware = authMiddleware;
module.exports.adminOnly = adminOnly;
