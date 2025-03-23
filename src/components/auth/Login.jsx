import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, getUserRole } from '../../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');

    try {
      await loginUser(formData);
      const role = getUserRole();

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/tasks');
      }
    } catch (error) {
      setLoginError(typeof error === 'string' ? error : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        {loginError && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>{loginError}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} style={{ width: '100%', padding: '10px', border: `1px solid ${errors.username ? 'red' : '#ccc'}`, borderRadius: '5px' }} />
            {errors.username && <span style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px' }}>{errors.username}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '10px', border: `1px solid ${errors.password ? 'red' : '#ccc'}`, borderRadius: '5px' }} />
            {errors.password && <span style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px' }}>{errors.password}</span>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don’t have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
