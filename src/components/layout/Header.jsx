import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const username = localStorage.getItem('username') || 'User'; // fallback username

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span 
        className="navbar-brand" 
        style={{ cursor: 'pointer' }} 
        onClick={() => navigate('/tasks')}
      >
        Todo App
      </span>

      {authenticated && (
        <div className="d-flex ms-auto align-items-center gap-3">
          <span className="text-light">
            Welcome, <strong>{username}</strong>
          </span>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
