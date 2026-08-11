// src/controllers/adminController.js
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');
const { asyncHandler } = require('../middleware/errorHandler');
const generatedBooks = require('../seeders/booksData');

// GET /api/admin/users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);

  const [users, total] = await Promise.all([
    User.find()
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    User.countDocuments(),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/admin/books
exports.getAllBooksAdmin = asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json({ success: true, data: books });
});

// POST /api/admin/books
exports.createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, data: book });
});

// PUT /api/admin/books/:id
exports.updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  res.json({ success: true, data: book });
});

// DELETE /api/admin/books/:id
// Soft delete - keeps historical order/rental references valid
exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  res.json({ success: true, message: 'Book deactivated', data: book });
});

// GET /api/admin/orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate('user', 'name email')
      .populate('items.book', 'title author')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Order.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: orders,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

// GET /api/admin/reports
exports.getReports = asyncHandler(async (req, res) => {
  const [totalUsers, totalBooks, totalOrders, revenueAgg, statusBreakdown, topBooks] =
    await Promise.all([
      User.countDocuments(),
      Book.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Book.find({ isActive: true }).sort({ rating: -1, numReviews: -1 }).limit(5).select('title author rating numReviews'),
    ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalBooks,
      totalOrders,
      totalRevenue: revenueAgg[0]?.total || 0,
      ordersByStatus: statusBreakdown.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
      topRatedBooks: topBooks,
    },
  });
});

// POST /api/admin/seed/books
// Convenience endpoint to seed the 66-book demo catalog directly via API,
// matching the deployment guide's "Option A: Via API call" instructions.
exports.seedBooksEndpoint = asyncHandler(async (req, res) => {
  await Book.deleteMany({});
  const inserted = await Book.insertMany(generatedBooks);
  res.json({ success: true, message: `Seeded ${inserted.length} books`, count: inserted.length });
});
