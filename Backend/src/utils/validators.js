// src/utils/validators.js
const { body, param, query } = require('express-validator');

exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.bookIdParamValidation = [param('id').isMongoId().withMessage('Invalid book id')];

exports.addToCartValidation = [
  body('bookId').isMongoId().withMessage('Valid bookId is required'),
  body('rentalDuration')
    .isIn([7, 14, 30])
    .withMessage('rentalDuration must be 7, 14, or 30'),
];

exports.reviewValidation = [
  body('bookId').isMongoId().withMessage('Valid bookId is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('comment').optional().isString().trim(),
];

exports.paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];
