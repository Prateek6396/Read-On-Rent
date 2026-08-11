// src/routes/reviews.js
const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validation');
const { reviewValidation } = require('../utils/validators');

router.post('/', authMiddleware, reviewValidation, validate, reviewController.addReview);
router.get('/:bookId', reviewController.getReviews);

module.exports = router;
