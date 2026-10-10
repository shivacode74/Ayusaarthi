const Feedback = require('../models/Feedback');

// @desc    Add feedback for a doctor
// @route   POST /api/feedback
// @access  Private (Patient only)
const addFeedback = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;

    if (!doctorId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide all details' });
    }

    const feedback = await Feedback.create({
      patientId: req.user._id,
      doctorId,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedback for a specific doctor
// @route   GET /api/feedback/doctor/:doctorId
// @access  Public
const getDoctorFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ doctorId: req.params.doctorId })
      .populate('patientId', 'name')
      .sort({ createdAt: -1 });

    // Calculate Average Rating
    const totalReviews = feedbacks.length;
    const avgRating = totalReviews > 0
      ? (feedbacks.reduce((acc, item) => item.rating + acc, 0) / totalReviews).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      totalReviews,
      avgRating,
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addFeedback, getDoctorFeedback };