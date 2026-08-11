// src/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
