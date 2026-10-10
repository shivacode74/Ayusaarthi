import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Star, MapPin, IndianRupee, Calendar, Award, UserCheck, MessageSquare } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchDoctorDetails = async () => {
    try {
      const docRes = await API.get(`/doctors/${id}`);
      setDoctor(docRes.data.data);

      const reviewRes = await API.get(`/feedback/doctor/${id}`);
      setReviews(reviewRes.data.data);
      setAvgRating(reviewRes.data.avgRating);
    } catch (err) {
      console.error('Error fetching doctor details', err);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await API.post('/feedback', {
        doctorId: id,
        rating: Number(rating),
        comment,
      });
      setMessage(res.data.message || 'Feedback submitted!');
      setComment('');
      fetchDoctorDetails(); // Refresh reviews list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  if (!doctor) {
    return <div className="text-center py-20 text-gray-500">Loading Doctor Profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Doctor Header & History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              Verified Profile
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">{doctor.userId?.name}</h1>
            <p className="text-blue-600 font-semibold text-lg">{doctor.specialization}</p>
            <p className="text-gray-600 mt-1">{doctor.qualifications}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center min-w-[140px]">
            <div className="flex items-center justify-center gap-1 text-amber-500 text-2xl font-bold">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>{avgRating}</span>
            </div>
            <p className="text-xs text-amber-700 font-medium mt-1">{reviews.length} Total Reviews</p>
          </div>
        </div>

        <hr className="my-6 border-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <Award className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="font-bold">{doctor.experienceYears} Years</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <IndianRupee className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Consultation Fee</p>
              <p className="font-bold">₹{doctor.consultationFee}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <Calendar className="w-6 h-6 text-purple-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Available Days</p>
              <p className="font-bold">{doctor.availableDays.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 text-sm text-gray-600 bg-blue-50/50 p-4 rounded-xl">
          <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-800">Clinic Address: </span>
            {doctor.clinicAddress}
          </div>
        </div>
      </div>

      {/* Give Feedback Form (Only for Patients) */}
      {user?.role === 'patient' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Leave Feedback & Rating
          </h2>

          {message && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{message}</div>}
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">{error}</div>}

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Rating (1 to 5 Stars)</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value="3">⭐⭐⭐ (3 - Average)</option>
                <option value="2">⭐⭐ (2 - Poor)</option>
                <option value="1">⭐ (1 - Terrible)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your Review / Experience</label>
              <textarea
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience regarding diagnosis, wait time, doctor behavior..."
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Patient Reviews Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Patient Feedback & Reviews ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No reviews yet for this doctor.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{rev.patientId?.name || 'Anonymous Patient'}</span>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{rev.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;