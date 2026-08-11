// src/routes/rentals.js
const router = require('express').Router();
const rentalController = require('../controllers/rentalController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', rentalController.getRentalHistory);
router.get('/:id', rentalController.getRentalById);
router.post('/:id/return', rentalController.scheduleReturn);

module.exports = router;
