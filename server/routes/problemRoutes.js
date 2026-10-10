const express = require('express');
const router = express.Router();
const { createProblem, getAllProblems } = require('../controllers/problemController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('patient'), createProblem);
router.get('/', protect, getAllProblems);

module.exports = router;