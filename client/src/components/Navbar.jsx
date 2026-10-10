import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Stethoscope, User, LogOut, Home, FileText, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <Stethoscope className="w-8 h-8" />
              <span>Ayusaarthi</span>
            </Link>
            
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium text-sm">
              <Home className="w-4 h-4" /> Home
            </Link>

            {/* Patient Specific Navigation Links */}
            {user?.role === 'patient' && (
              <>
                <Link to="/submit-problem" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium text-sm">
                  <FileText className="w-4 h-4" /> Share Problem
                </Link>
                <Link to="/ai-recommendation" className="text-purple-600 hover:text-purple-700 flex items-center gap-1 font-semibold text-sm bg-purple-50 px-3 py-1.5 rounded-lg transition">
                  <Sparkles className="w-4 h-4" /> AI Doctor Match
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold flex items-center gap-1 text-sm">
                  <User className="w-4 h-4 text-blue-600" /> {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;