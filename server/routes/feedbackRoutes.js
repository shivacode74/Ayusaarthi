const express = require('express');
const router = express.Router();
const { addFeedback, getDoctorFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('patient'), addFeedback);
router.get('/doctor/:doctorId', getDoctorFeedback);

module.exports = router;