const DoctorProfile = require('../models/DoctorProfile');

// @desc    Create or Update Doctor Profile
// @route   POST /api/doctors/profile
// @access  Private (Doctor)
const createOrUpdateDoctorProfile = async (req, res) => {
  try {
    const {
      specialization,
      qualifications,
      experienceYears,
      consultationFee,
      clinicAddress,
      availableDays,
    } = req.body;

    // Validation check
    if (!specialization || !qualifications || !experienceYears || !consultationFee || !clinicAddress || !availableDays) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const profileFields = {
      userId: req.user._id, // Auth middleware se aayi logged-in doctor ki ID
      specialization,
      qualifications,
      experienceYears: Number(experienceYears),
      consultationFee: Number(consultationFee),
      clinicAddress,
      availableDays,
    };

    // Check if profile already exists for this doctor
    let profile = await DoctorProfile.findOne({ userId: req.user._id });

    if (profile) {
      // Update existing profile
      profile = await DoctorProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Doctor profile updated successfully!',
        data: profile,
      });
    }

    // Create new profile
    profile = await DoctorProfile.create(profileFields);
    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully!',
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorProfile.find({}).populate('userId', 'name email phone');
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorProfile.findById(req.params.id).populate('userId', 'name email phone');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateDoctorProfile,
  getAllDoctors,
  getDoctorById,
};