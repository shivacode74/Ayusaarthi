import React, { useState } from 'react';
import API from '../services/api';
import { Bot, Sparkles, Send, MapPin, IndianRupee, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIRecommend = () => {
  const [problemDescription, setProblemDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAIAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await API.post('/ai/recommend-doctor', { problemDescription });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'AI analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl mb-8 shadow-lg flex items-center gap-4">
        <Bot className="w-12 h-12 shrink-0 bg-white/10 p-2 rounded-xl" />
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            AI Doctor Matchmaker <Sparkles className="w-5 h-5 text-yellow-300" />
          </h1>
          <p className="text-purple-100 text-sm mt-1">
            Describe your health problem or symptoms, and our AI will instantly suggest the best specialist and doctors for you.
          </p>
        </div>
      </div>

      {/* Query Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleAIAnalysis} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">What are you experiencing? (Symptoms / Problem)</label>
            <textarea
              rows="3"
              required
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g., I have been having severe chest pain and breathlessness since morning..."
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? 'AI is analyzing your problem...' : <><Send className="w-4 h-4" /> Get AI Recommendation</>}
          </button>
        </form>
      </div>

      {/* AI Analysis Result */}
      {result && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
            <h3 className="font-bold text-purple-900 text-lg mb-1">AI Health Assessment</h3>
            <p className="text-purple-800 text-sm">{result.analysis.message}</p>
          </div>

          <h3 className="text-xl font-bold text-gray-900">Recommended Doctors ({result.doctors.length})</h3>

          {result.doctors.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No verified doctors found for this specific category right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.doctors.map((doc) => (
                <div key={doc._id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{doc.userId?.name}</h4>
                        <span className="inline-block bg-purple-50 text-purple-600 text-xs font-semibold px-2.5 py-1 rounded-md mt-1">
                          {doc.specialization}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-500" /> {doc.experienceYears} yrs exp
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600 mb-6">
                      <p className="font-medium text-gray-700">{doc.qualifications}</p>
                      <p className="flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                        <span>{doc.clinicAddress}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-base text-gray-900 flex items-center">
                      <IndianRupee className="w-4 h-4" /> {doc.consultationFee}
                    </span>
                    <Link
                      to={`/doctor/${doc._id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition"
                    >
                      View Profile & Reviews
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommend;