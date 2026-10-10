const Problem = require('../models/Problem');

// @desc    Post a new health problem
// @route   POST /api/problems
// @access  Private (Patient only)
const createProblem = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    const problem = await Problem.create({
      patientId: req.user._id,
      title,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'Problem shared successfully!',
      data: problem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all problems (For Doctor/Admin review or future AI matching)
// @route   GET /api/problems
// @access  Private
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).populate('patientId', 'name email phone');
    res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProblem, getAllProblems };