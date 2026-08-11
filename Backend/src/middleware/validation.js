// src/middleware/validation.js
const { validationResult } = require('express-validator');

/**
 * Runs after any express-validator chains in a route's middleware array.
 * If validation failed, returns a 400 with a list of field errors.
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
