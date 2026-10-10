const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true, // e.g., General, Heart, Skin, Bones, etc.
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);