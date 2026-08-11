// src/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        rentalDuration: { type: Number, enum: [7, 14, 30], default: 7 },
        quantity: { type: Number, default: 1, min: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
