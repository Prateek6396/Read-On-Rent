// src/controllers/cartController.js
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const Order = require('../models/Order');
const Rental = require('../models/Rental');
const { asyncHandler } = require('../middleware/errorHandler');
const { TAX_RATE } = require('../config/constants');

const priceField = (duration) =>
  duration === 7 ? 'rentalPrice7Days' : duration === 14 ? 'rentalPrice14Days' : 'rentalPrice30Days';

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

async function populateCartTotal(cart) {
  const populated = await cart.populate('items.book');
  let total = 0;
  const items = populated.items.map((item) => {
    if (!item.book) return item; // book may have been deleted
    const price = item.book[priceField(item.rentalDuration)] || 0;
    total += price * item.quantity;
    return item;
  });
  return { items, total };
}

// GET /api/cart (auth required)
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const { items, total } = await populateCartTotal(cart);
  res.json({ success: true, data: { items, total, itemCount: items.length } });
});

// POST /api/cart/add (auth required)
exports.addToCart = asyncHandler(async (req, res) => {
  const { bookId, rentalDuration, quantity = 1 } = req.body;

  const book = await Book.findById(bookId);
  if (!book || !book.isActive) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  if (book.availableCopies < 1) {
    return res.status(400).json({ success: false, message: 'Book is currently out of stock' });
  }

  const cart = await getOrCreateCart(req.user._id);
  const existingItem = cart.items.find(
    (i) => i.book.toString() === bookId && i.rentalDuration === rentalDuration
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ book: bookId, rentalDuration, quantity });
  }

  await cart.save();
  const { items, total } = await populateCartTotal(cart);
  res.json({ success: true, data: { items, total, itemCount: items.length } });
});

// PUT /api/cart/:bookId (auth required) - update quantity
exports.updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await getOrCreateCart(req.user._id);

  const item = cart.items.find((i) => i.book.toString() === req.params.bookId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not in cart' });
  }

  if (quantity < 1) {
    cart.items = cart.items.filter((i) => i.book.toString() !== req.params.bookId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  const { items, total } = await populateCartTotal(cart);
  res.json({ success: true, data: { items, total, itemCount: items.length } });
});

// DELETE /api/cart/:bookId (auth required)
exports.removeFromCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((i) => i.book.toString() !== req.params.bookId);
  await cart.save();

  const { items, total } = await populateCartTotal(cart);
  res.json({ success: true, data: { items, total, itemCount: items.length } });
});

// POST /api/cart/clear (auth required)
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ success: true, data: { items: [], total: 0, itemCount: 0 } });
});

// POST /api/cart/checkout (auth required)
exports.checkout = asyncHandler(async (req, res) => {
  const { deliveryAddress, paymentMethod = 'razorpay' } = req.body;

  const cart = await getOrCreateCart(req.user._id);
  if (!cart.items.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const populatedCart = await cart.populate('items.book');

  let subtotal = 0;
  let securityDeposit = 0;
  const orderItems = [];

  for (const item of populatedCart.items) {
    if (!item.book || !item.book.isActive) {
      return res.status(400).json({
        success: false,
        message: `Book "${item.book?.title || 'unknown'}" is no longer available`,
      });
    }
    if (item.book.availableCopies < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Not enough copies available for "${item.book.title}"`,
      });
    }

    const price = item.book[priceField(item.rentalDuration)];
    subtotal += price * item.quantity;
    securityDeposit += item.book.securityDeposit * item.quantity;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + item.rentalDuration);

    orderItems.push({
      book: item.book._id,
      rentalDuration: item.rentalDuration,
      rentalPrice: price,
      securityDeposit: item.book.securityDeposit,
      quantity: item.quantity,
      dueDate,
    });
  }

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + securityDeposit + tax;

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    subtotal,
    securityDeposit,
    tax,
    total,
    deliveryAddress,
    paymentMethod,
    status: 'confirmed',
    paymentStatus: 'completed', // demo: assume payment succeeds; wire up Razorpay verification for production
  });

  // Decrement inventory & create individual Rental records for tracking
  for (const item of orderItems) {
    await Book.findByIdAndUpdate(item.book, { $inc: { availableCopies: -item.quantity } });
    await Rental.create({
      user: req.user._id,
      order: order._id,
      book: item.book,
      rentalDuration: item.rentalDuration,
      dueDate: item.dueDate,
    });
  }

  // Clear the cart after successful checkout
  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, data: order });
});
