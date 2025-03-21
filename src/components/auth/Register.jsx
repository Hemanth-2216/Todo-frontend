import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
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

    // Full Name Validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.length < 3 || formData.fullname.length > 50) {
      newErrors.fullname = 'Full name must be between 3 and 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
      newErrors.fullname = 'Full name can only contain letters and spaces';
    }

    // Username Validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4 || formData.username.length > 20) {
      newErrors.username = 'Username must be between 4 and 20 characters';
    } else if (!/^\w+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setRegisterError('');

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      setRegisterError(typeof error === 'string' ? error : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const formGroupStyle = {
    marginBottom: '15px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const inputStyle = (error) => ({
    width: '100%',
    padding: '10px',
    border: `1px solid ${error ? 'red' : '#ccc'}`,
    borderRadius: '5px',
    boxSizing: 'border-box'
  });

  const errorTextStyle = {
    color: 'red',
    fontSize: '0.85rem',
    marginTop: '5px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const errorMessageStyle = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center'
  };

  const redirectTextStyle = {
    textAlign: 'center',
    marginTop: '15px'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Register</h2>
        {registerError && <div style={errorMessageStyle}>{registerError}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="fullname" style={labelStyle}>Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              style={inputStyle(errors.fullname)}
            />
            {errors.fullname && <span style={errorTextStyle}>{errors.fullname}</span>}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle(errors.username)}
            />
            {errors.username && <span style={errorTextStyle}>{errors.username}</span>}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle(errors.email)}
            />
            {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle(errors.password)}
            />
            {errors.password && <span style={errorTextStyle}>{errors.password}</span>}
          </div>

          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={redirectTextStyle}>
          Already have an account? <a href="/login" style={linkStyle}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
