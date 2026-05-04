const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTourById,
  createTour,
} = require('../controllers/tourController');

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', createTour);

module.exports = router;
