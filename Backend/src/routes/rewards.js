// src/routes/rewards.js
const router = require('express').Router();
const rewardController = require('../controllers/rewardController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', rewardController.getBalance);
router.get('/history', rewardController.getHistory);
router.post('/redeem', rewardController.redeemPoints);

module.exports = router;
