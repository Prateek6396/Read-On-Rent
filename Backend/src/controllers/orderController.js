// src/controllers/orderController.js
const Order = require('../models/Order');
const Rental = require('../models/Rental');
const Book = require('../models/Book');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/orders (auth required)
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.book', 'title author coverImage')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// GET /api/orders/:id (auth required)
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate(
    'items.book',
    'title author coverImage'
  );
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

// POST /api/orders/:id/track (auth required)
exports.trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const timeline = [
    { status: 'pending', label: 'Order Placed', done: true },
    { status: 'confirmed', label: 'Order Confirmed', done: ['confirmed', 'shipped', 'delivered'].includes(order.status) },
    { status: 'shipped', label: 'Shipped', done: ['shipped', 'delivered'].includes(order.status) },
    { status: 'delivered', label: 'Delivered', done: order.status === 'delivered' },
  ];

  res.json({ success: true, data: { currentStatus: order.status, timeline } });
});

// POST /api/orders/:id/cancel (auth required)
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  if (['delivered', 'cancelled', 'returned'].includes(order.status)) {
    return res.status(400).json({ success: false, message: `Cannot cancel a ${order.status} order` });
  }

  order.status = 'cancelled';
  order.paymentStatus = order.paymentStatus === 'completed' ? 'refunded' : order.paymentStatus;
  await order.save();

  // Restore inventory
  for (const item of order.items) {
    await Book.findByIdAndUpdate(item.book, { $inc: { availableCopies: item.quantity } });
  }
  await Rental.updateMany({ order: order._id }, { status: 'returned', returnedDate: new Date() });

  res.json({ success: true, data: order });
});

// POST /api/orders/:id/return (auth required)
exports.returnRequest = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = 'returned';
  order.returnDate = new Date();
  await order.save();

  await Rental.updateMany(
    { order: order._id },
    { status: 'return_scheduled', returnScheduledDate: new Date() }
  );

  res.json({ success: true, data: order, message: 'Return request submitted' });
});
