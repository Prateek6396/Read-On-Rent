// src/models/Rental.js
const mongoose = require('mongoose');

// A Rental represents a single book's active/past rental lifecycle,
// derived from an Order item, so it can be tracked/returned individually.
const rentalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },

    rentalDuration: { type: Number, enum: [7, 14, 30], required: true },
    startDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ['active', 'return_scheduled', 'returned', 'overdue'],
      default: 'active',
    },

    returnScheduledDate: Date,
    returnedDate: Date,
    lateFee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rental', rentalSchema);
