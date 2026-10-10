import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const DoctorProfileSetup = () => {
  const [formData, setFormData] = useState({
    specialization: '',
    qualifications: '',
    experienceYears: '',
    consultationFee: '',
    clinicAddress: '',
    availableDays: '', // comma separated input lenge (e.g. Mon, Tue, Wed)
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // availableDays ko array mein convert kar rahe hain ('Mon, Tue' -> ['Mon', 'Tue'])
      const formattedData = {
        ...formData,
        experienceYears: Number(formData.experienceYears),
        consultationFee: Number(formData.consultationFee),
        availableDays: formData.availableDays.split(',').map((day) => day.trim()),
      };

      const res = await API.post('/doctors/profile', formattedData);
      setMessage(res.data.message || 'Profile saved successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Setup Doctor Professional Profile</h2>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Specialization (e.g., Cardiologist, Dermatologist)</label>
            <input
              name="specialization"
              type="text"
              required
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Cardiologist"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Qualifications (e.g., MBBS, MD)</label>
            <input
              name="qualifications"
              type="text"
              required
              value={formData.qualifications}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="MBBS, AIIMS Delhi"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
              <input
                name="experienceYears"
                type="number"
                required
                value={formData.experienceYears}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="5"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
              <input
                name="consultationFee"
                type="number"
                required
                value={formData.consultationFee}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Clinic / Hospital Address</label>
            <textarea
              name="clinicAddress"
              rows="2"
              required
              value={formData.clinicAddress}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="City Hospital, Main Road, Delhi"
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Available Days (Comma separated)</label>
            <input
              name="availableDays"
              type="text"
              required
              value={formData.availableDays}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Mon, Tue, Wed, Thu, Fri"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileSetup;