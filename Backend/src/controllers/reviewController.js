// src/controllers/reviewController.js
const Review = require('../models/Review');
const Book = require('../models/Book');
const { asyncHandler } = require('../middleware/errorHandler');

// Recalculates and stores a book's average rating and review count.
async function refreshBookRating(bookId) {
  const stats = await Review.aggregate([
    { $match: { book: bookId } },
    { $group: { _id: '$book', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);

  const { avgRating = 0, count = 0 } = stats[0] || {};
  await Book.findByIdAndUpdate(bookId, {
    rating: Math.round(avgRating * 10) / 10,
    numReviews: count,
  });
}

// POST /api/reviews (auth required)
exports.addReview = asyncHandler(async (req, res) => {
  const { bookId, rating, comment, rentalId } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  const existing = await Review.findOne({ book: bookId, user: req.user._id });
  if (existing) {
    return res.status(400).json({ success: false, message: 'You already reviewed this book' });
  }

  const review = await Review.create({
    book: bookId,
    user: req.user._id,
    rental: rentalId || undefined,
    rating,
    comment,
  });

  await refreshBookRating(book._id);

  res.status(201).json({ success: true, data: review });
});

// GET /api/reviews/:bookId
exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: reviews });
});
