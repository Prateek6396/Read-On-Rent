// src/routes/categories.js
const router = require('express').Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getCategories);

module.exports = router;
