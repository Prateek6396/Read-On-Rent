// src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    items: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        rentalDuration: Number, // 7, 14, or 30 days
        rentalPrice: Number,
        securityDeposit: Number,
        quantity: Number,
        dueDate: Date,
      },
    ],

    // Pricing
    subtotal: Number,
    securityDeposit: Number,
    tax: Number,
    total: Number,

    // Delivery
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },

    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled'],
      default: 'pending',
    },

    // Dates
    orderDate: { type: Date, default: Date.now },
    deliveredDate: Date,
    returnDate: Date,

    // Payment
    paymentMethod: String,
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionId: String,
  },
  { timestamps: true }
);

// Auto-generate a human friendly order number before validation
orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ROR-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      Math.random() * 1000
    )}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
