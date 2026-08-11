// src/controllers/rewardController.js
const Reward = require('../models/Reward');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');
const { REWARD_POINTS_PER_RUPEE_REDEEM } = require('../config/constants');

// GET /api/rewards (auth required)
exports.getBalance = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { rewardPoints: req.user.rewardPoints } });
});

// GET /api/rewards/history (auth required)
exports.getHistory = asyncHandler(async (req, res) => {
  const history = await Reward.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: history });
});

// POST /api/rewards/redeem (auth required)
exports.redeemPoints = asyncHandler(async (req, res) => {
  const { points, orderId } = req.body;

  if (!points || points <= 0) {
    return res.status(400).json({ success: false, message: 'Valid points value required' });
  }

  const user = await User.findById(req.user._id);
  if (user.rewardPoints < points) {
    return res.status(400).json({ success: false, message: 'Insufficient reward points' });
  }

  user.rewardPoints -= points;
  await user.save();

  const record = await Reward.create({
    user: user._id,
    type: 'redeem',
    points,
    reason: orderId ? `Redeemed on order #${orderId}` : 'Points redeemed',
    order: orderId || undefined,
    balanceAfter: user.rewardPoints,
  });

  const discountValue = points * REWARD_POINTS_PER_RUPEE_REDEEM;

  res.json({
    success: true,
    data: { record, remainingPoints: user.rewardPoints, discountValue },
  });
});
