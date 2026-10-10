import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setUser(res.data.data);
        } catch (error) {
          console.error('Session expired or invalid token', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Login Function
  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  // Register Function
  const register = async (userData) => {
    const res = await API.post('/auth/register', userData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};