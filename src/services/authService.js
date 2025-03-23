import api from '../utils/api';

const AUTH_API_URL = '/api/auth';

// Register a new user
const registerUser = async (userData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Login user and store tokens & user info in localStorage
const loginUser = async (loginData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/login`, loginData);
    if (response.data) {
      // Parse response assuming it's returned as a comma-separated string
      const [accessToken, refreshToken, userId, username, role] = response.data.split(',');

      // Store user data in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Logout user and remove stored tokens & user data
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('isAuthenticated');
};

// Check if user is authenticated
const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';

// Get access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Get refresh token from localStorage
const getRefreshToken = () => localStorage.getItem('refreshToken');

// Get current user's ID from localStorage
const getCurrentUserId = () => localStorage.getItem('userId');

// Get current user's username from localStorage
const getCurrentUsername = () => localStorage.getItem('username');

// Get user's role from localStorage
const getUserRole = () => localStorage.getItem('role');

export {
  registerUser,
  loginUser,
  logout,
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  getCurrentUserId,
  getCurrentUsername,
  getUserRole,
};
