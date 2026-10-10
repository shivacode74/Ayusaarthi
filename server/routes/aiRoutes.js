const express = require('express');
const router = express.Router();
const { recommendDoctor } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/recommend-doctor', protect, authorize('patient'), recommendDoctor);

module.exports = router;