import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FileText, Send } from 'lucide-react';

const SubmitProblem = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'General Physician',
    description: '',
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
      const res = await API.post('/problems', formData);
      setMessage(res.data.message || 'Problem posted successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit problem');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-6 text-blue-600">
          <FileText className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-900">Share Your Health Problem</h2>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Problem Title / Symptoms Summary</label>
            <input
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Severe chest pain and shortness of breath"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Select Related Category / Specialization</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist (Heart)</option>
              <option value="Dermatologist">Dermatologist (Skin)</option>
              <option value="Orthopedic">Orthopedic (Bones/Joints)</option>
              <option value="Neurologist">Neurologist (Brain/Nerves)</option>
              <option value="Pediatrician">Pediatrician (Children)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Describe how long you have been facing this issue, any past medical history, etc."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProblem;