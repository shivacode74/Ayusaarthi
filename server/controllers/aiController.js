const Problem = require('../models/Problem');
const DoctorProfile = require('../models/DoctorProfile');

// @desc    AI Doctor Recommendation based on patient symptoms/problem
// @route   POST /api/ai/recommend-doctor
// @access  Private (Patient)
const recommendDoctor = async (req, res) => {
  try {
    const { problemDescription } = req.body;

    if (!problemDescription) {
      return res.status(400).json({ success: false, message: 'Please provide problem description' });
    }

    const text = problemDescription.toLowerCase();
    let suggestedSpecialization = 'General Physician'; // Default

    // Simple Smart Keyword Matching Logic for AI
    if (text.includes('heart') || text.includes('chest pain') || text.includes('palpitation') || text.includes('blood pressure')) {
      suggestedSpecialization = 'Cardiologist';
    } else if (text.includes('skin') || text.includes('rash') || text.includes('acne') || text.includes('itching') || text.includes('pimple')) {
      suggestedSpecialization = 'Dermatologist';
    } else if (text.includes('bone') || text.includes('joint') || text.includes('knee') || text.includes('fracture') || text.includes('back pain')) {
      suggestedSpecialization = 'Orthopedic';
    } else if (text.includes('headache') || text.includes('brain') || text.includes('migraine') || text.includes('dizzy') || text.includes('nerve')) {
      suggestedSpecialization = 'Neurologist';
    } else if (text.includes('child') || text.includes('baby') || text.includes('kid') || text.includes('infant')) {
      suggestedSpecialization = 'Pediatrician';
    }

    // Find doctors matching this specialization from database
    const matchingDoctors = await DoctorProfile.find({
      specialization: { $regex: new RegExp(suggestedSpecialization, 'i') },
    }).populate('userId', 'name email phone');

    res.status(200).json({
      success: true,
      analysis: {
        detectedCategory: suggestedSpecialization,
        message: `Based on your symptoms, our AI recommends consulting a ${suggestedSpecialization}.`,
      },
      doctors: matchingDoctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { recommendDoctor };