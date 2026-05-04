const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
} = require('../controllers/tourController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes — ไม่ต้อง Login
router.get('/', getAllTours);
router.get('/:id', getTourById);

// Protected routes — ต้อง Login + เป็น Admin
router.post('/', protect, adminOnly, createTour);

module.exports = router;
