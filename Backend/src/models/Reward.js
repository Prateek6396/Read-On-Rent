// src/models/Reward.js
const mongoose = require('mongoose');

// Ledger of reward point transactions (earn/redeem) per user.
const rewardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['earn', 'redeem'], required: true },
    points: { type: Number, required: true },
    reason: { type: String, required: true }, // e.g. "Rental completed", "Redeemed on order #123"
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    balanceAfter: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reward', rewardSchema);
