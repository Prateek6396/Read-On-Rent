// src/controllers/bookController.js
const Book = require('../models/Book');
const Review = require('../models/Review');
const { asyncHandler } = require('../middleware/errorHandler');
const { CATEGORIES, PAGINATION_DEFAULT_LIMIT } = require('../config/constants');

// GET /api/books?category=&sort=&page=&limit=
exports.getAllBooks = asyncHandler(async (req, res) => {
  const { category, sort, page = 1, limit = PAGINATION_DEFAULT_LIMIT } = req.query;

  const filter = { isActive: true };
  if (category) filter.category = category;

  let sortOption = { createdAt: -1 };
  if (sort === 'rating') sortOption = { rating: -1 };
  if (sort === 'price') sortOption = { rentalPrice7Days: 1 };
  if (sort === '-price') sortOption = { rentalPrice7Days: -1 };

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(parseInt(limit, 10) || PAGINATION_DEFAULT_LIMIT, 100);

  const [books, total] = await Promise.all([
    Book.find(filter)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Book.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: books,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

// GET /api/books/:id
exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book || !book.isActive) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  res.json({ success: true, data: book });
});

// GET /api/books/search?q=
exports.searchBooks = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ success: false, message: 'Query param "q" is required' });
  }

  const books = await Book.find({
    isActive: true,
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { author: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
    ],
  }).limit(50);

  res.json({ success: true, data: books });
});

// GET /api/categories
exports.getCategories = asyncHandler(async (req, res) => {
  const dbCategories = await Book.distinct('category', { isActive: true });
  const categories = dbCategories.length ? dbCategories : CATEGORIES;
  res.json({ success: true, data: categories });
});
