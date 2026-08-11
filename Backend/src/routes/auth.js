// src/routes/auth.js
const router = require('express').Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimiter');
const { registerValidation, loginValidation } = require('../utils/validators');

router.post('/register', authLimiter, registerValidation, validate, authController.register);
router.post('/login', authLimiter, loginValidation, validate, authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/verify', authMiddleware, authController.verify);

module.exports = router;
