const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    qualifications: {
      type: String,
      required: true,
      trim: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
      trim: true,
    },
    availableDays: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);