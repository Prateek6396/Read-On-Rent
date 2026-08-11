// src/routes/admin.js
const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

router.use(authMiddleware, adminOnly); // every admin route requires auth + admin role

router.get('/users', adminController.getAllUsers);

router.get('/books', adminController.getAllBooksAdmin);
router.post('/books', adminController.createBook);
router.put('/books/:id', adminController.updateBook);
router.delete('/books/:id', adminController.deleteBook);

router.get('/orders', adminController.getAllOrders);
router.get('/reports', adminController.getReports);

router.post('/seed/books', adminController.seedBooksEndpoint);

module.exports = router;
