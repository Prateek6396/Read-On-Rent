// src/controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');
const { asyncHandler } = require('../middleware/errorHandler');

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, books: [] });
  return wishlist;
}

// GET /api/wishlist (auth required)
exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  await wishlist.populate('books');
  res.json({ success: true, data: wishlist.books });
});

// POST /api/wishlist/add (auth required)
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  const wishlist = await getOrCreateWishlist(req.user._id);
  if (!wishlist.books.some((b) => b.toString() === bookId)) {
    wishlist.books.push(bookId);
    await wishlist.save();
  }

  await wishlist.populate('books');
  res.json({ success: true, data: wishlist.books });
});

// DELETE /api/wishlist/:bookId (auth required)
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  wishlist.books = wishlist.books.filter((b) => b.toString() !== req.params.bookId);
  await wishlist.save();

  await wishlist.populate('books');
  res.json({ success: true, data: wishlist.books });
});

// GET /api/wishlist/:bookId (auth required) - check if in wishlist
exports.checkWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  const inWishlist = wishlist.books.some((b) => b.toString() === req.params.bookId);
  res.json({ success: true, data: { inWishlist } });
});
