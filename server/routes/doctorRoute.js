const express = require('express');
const router = express.Router();
const {
  createOrUpdateDoctorProfile,
  getAllDoctors,
  getDoctorById,
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/profile', protect, authorize('doctor'), createOrUpdateDoctorProfile);

module.exports = router;