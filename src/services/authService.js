// src/services/authService.js
import api from '../utils/api';

const AUTH_API_URL = '/api/auth';

const registerUser = async (userData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Registration failed';
  }
};

const loginUser = async (loginData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/login`, loginData);
    if (response.data) {
      const [userId, username] = response.data.split(',');
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

const logout = () => {
  localStorage.clear();
};

const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export { registerUser, loginUser, logout, isAuthenticated };
