// src/routes/wishlist.js
const router = require('express').Router();
const wishlistController = require('../controllers/wishlistController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', wishlistController.getWishlist);
router.post('/add', wishlistController.addToWishlist);
router.delete('/:bookId', wishlistController.removeFromWishlist);
router.get('/:bookId', wishlistController.checkWishlist);

module.exports = router;
