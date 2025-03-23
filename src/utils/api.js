import axios from 'axios';
import { getAccessToken, getRefreshToken, logout, loginUser } from '../services/authService';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry and Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Request a new access token
          const res = await axios.post('http://localhost:8080/api/auth/refresh', { refreshToken });

          if (res.data && res.data.accessToken) {
            const { accessToken } = res.data;

            // Store new token and retry failed request
            localStorage.setItem('accessToken', accessToken);
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(error.config); // Retry failed request with new token
          }
        } catch (refreshError) {
          logout(); // Logout user if refresh fails
          window.location.href = '/login';
        }
      } else {
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
