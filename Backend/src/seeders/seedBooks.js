// src/seeders/seedBooks.js
// Run with: npm run seed
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Book = require('../models/Book');
const books = require('./booksData');

(async () => {
  try {
    await connectDB();
    await Book.deleteMany({});
    const inserted = await Book.insertMany(books);
    console.log(`✅ Seeded ${inserted.length} books successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    process.exit(1);
  }
})();
