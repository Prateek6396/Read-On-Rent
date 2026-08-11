// src/routes/books.js
const router = require('express').Router();
const bookController = require('../controllers/bookController');

// NOTE: /search must be declared before /:id so "search" isn't treated as an id
router.get('/search', bookController.searchBooks);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
