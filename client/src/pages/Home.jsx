import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Calendar, Award } from 'lucide-react';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get('/doctors');
        setDoctors(res.data.data || []);
      } catch (error) {
        console.error('Error fetching doctors', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Safe Search Filter Logic (Name, Specialization, and Clinic Address)
  const filteredDoctors = doctors.filter((doc) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const doctorName = doc.userId?.name ? doc.userId.name.toLowerCase() : '';
    const specialization = doc.specialization ? doc.specialization.toLowerCase() : '';
    const clinicAddress = doc.clinicAddress ? doc.clinicAddress.toLowerCase() : '';

    return (
      doctorName.includes(query) ||
      specialization.includes(query) ||
      clinicAddress.includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Find & Connect with the Best Doctors</h1>
          <p className="text-blue-100 max-w-xl">
            Book appointments, check verified history, and share your health concerns easily in one place.
          </p>
        </div>
        {user?.role === 'doctor' && (
          <Link
            to="/doctor/profile-setup"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-50 transition whitespace-nowrap"
          >
            Manage Your Doctor Profile
          </Link>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-10">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, specialization (e.g., Cardiologist), or city..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Doctor Cards Grid */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
        <span className="text-sm text-gray-500">Showing {filteredDoctors.length} doctors</span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading doctors list...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No doctors found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm text-blue-600 font-semibold hover:underline"
          >
            Clear search filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{doc.userId?.name || 'Doctor'}</h3>
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-md mt-1">
                      {doc.specialization}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" /> {doc.experienceYears} yrs exp
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p className="font-medium text-gray-700">{doc.qualifications}</p>
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{doc.clinicAddress}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Days: {Array.isArray(doc.availableDays) ? doc.availableDays.join(', ') : doc.availableDays}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-lg text-gray-900 flex items-center">
                  <IndianRupee className="w-4 h-4" /> {doc.consultationFee}
                </span>
                <Link
                  to={`/doctor/${doc._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  View Profile & Reviews
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;