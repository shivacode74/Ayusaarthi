import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorProfileSetup from './pages/DoctorProfileSetup';
import SubmitProblem from './pages/SubmitProblem';
import DoctorDetails from './pages/DoctorDetails';
import AIRecommend from './pages/AIRecommend';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor/profile-setup" element={<DoctorProfileSetup />} />
          <Route path="/submit-problem" element={<SubmitProblem />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/ai-recommendation" element={<AIRecommend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;