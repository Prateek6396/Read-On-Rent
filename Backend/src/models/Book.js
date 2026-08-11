// src/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, sparse: true },
    category: { type: String, required: true, index: true },

    // Pricing
    rentalPrice7Days: { type: Number, required: true },
    rentalPrice14Days: { type: Number, required: true },
    rentalPrice30Days: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },

    // Book info
    description: String,
    coverImage: String,
    pages: Number,
    publisher: String,
    publicationYear: Number,

    // Ratings
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },

    // Inventory
    totalCopies: { type: Number, default: 10 },
    availableCopies: { type: Number, default: 10 },

    // Status
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
