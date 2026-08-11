// src/routes/orders.js
const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.post('/:id/track', orderController.trackOrder);
router.post('/:id/cancel', orderController.cancelOrder);
router.post('/:id/return', orderController.returnRequest);

module.exports = router;
