// src/controllers/rentalController.js
const Rental = require('../models/Rental');
const Reward = require('../models/Reward');
const User = require('../models/User');
const Book = require('../models/Book');
const { asyncHandler } = require('../middleware/errorHandler');
const { REWARD_POINTS_PER_RENTAL } = require('../config/constants');

// GET /api/rentals (auth required)
exports.getRentalHistory = asyncHandler(async (req, res) => {
  const rentals = await Rental.find({ user: req.user._id })
    .populate('book', 'title author coverImage')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: rentals });
});

// GET /api/rentals/:id (auth required)
exports.getRentalById = asyncHandler(async (req, res) => {
  const rental = await Rental.findOne({ _id: req.params.id, user: req.user._id }).populate(
    'book',
    'title author coverImage'
  );
  if (!rental) {
    return res.status(404).json({ success: false, message: 'Rental not found' });
  }
  res.json({ success: true, data: rental });
});

// POST /api/rentals/:id/return (auth required)
exports.scheduleReturn = asyncHandler(async (req, res) => {
  const rental = await Rental.findOne({ _id: req.params.id, user: req.user._id });
  if (!rental) {
    return res.status(404).json({ success: false, message: 'Rental not found' });
  }
  if (rental.status === 'returned') {
    return res.status(400).json({ success: false, message: 'Rental already returned' });
  }

  rental.status = 'returned';
  rental.returnedDate = new Date();
  await rental.save();

  // Restore inventory
  await Book.findByIdAndUpdate(rental.book, { $inc: { availableCopies: 1 } });

  // Award reward points for completing a rental
  const user = await User.findById(req.user._id);
  user.rewardPoints += REWARD_POINTS_PER_RENTAL;
  await user.save();

  await Reward.create({
    user: user._id,
    type: 'earn',
    points: REWARD_POINTS_PER_RENTAL,
    reason: 'Rental completed',
    order: rental.order,
    balanceAfter: user.rewardPoints,
  });

  res.json({ success: true, data: rental, message: `Return scheduled. You earned ${REWARD_POINTS_PER_RENTAL} points!` });
});
