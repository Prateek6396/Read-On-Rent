// src/routes/cart.js
const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validation');
const { addToCartValidation } = require('../utils/validators');

router.use(authMiddleware); // every cart route requires auth

router.get('/', cartController.getCart);
router.post('/add', addToCartValidation, validate, cartController.addToCart);
router.put('/:bookId', cartController.updateQuantity);
router.delete('/:bookId', cartController.removeFromCart);
router.post('/checkout', cartController.checkout);
router.post('/clear', cartController.clearCart);

module.exports = router;
