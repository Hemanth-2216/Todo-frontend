import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, blockUser, unblockUser, deleteUser } from '../../services/adminService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const userData = await getAllUsers();
      console.log("Fetched users:", userData);
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId) => {
    try {
      await blockUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error blocking user:", err);
      setError(err);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await unblockUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error unblocking user:", err);
      setError(err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
        setError(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
          Logout
        </button>

        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={tableCellStyle}>{user.id}</td>
                  <td style={tableCellStyle}>{user.username}</td>
                  <td style={tableCellStyle}>{user.blocked ? 'Blocked' : 'Active'}</td>
                  <td style={tableCellStyle}>
                    {user.blocked ? (
                      <button onClick={() => handleUnblock(user.id)} style={unblockButtonStyle}>
                        Unblock
                      </button>
                    ) : (
                      <button onClick={() => handleBlock(user.id)} style={blockButtonStyle}>
                        Block
                      </button>
                    )}
                    <button onClick={() => handleDelete(user.id)} style={deleteButtonStyle}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = { padding: '10px', textAlign: 'left', backgroundColor: '#007bff', color: 'white' };
const tableCellStyle = { padding: '10px' };
const blockButtonStyle = { padding: '5px 10px', marginRight: '10px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const unblockButtonStyle = { padding: '5px 10px', marginRight: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const deleteButtonStyle = { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default AdminDashboard;
