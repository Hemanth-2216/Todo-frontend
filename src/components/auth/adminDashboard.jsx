import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, blockUser, unblockUser } from '../../services/adminService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log('Fetched Users:', data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    await blockUser(id);
    fetchUsers();
  };

  const handleUnblock = async (id) => {
    await unblockUser(id);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullname || '-'}</td>
                  <td>{user.username || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>
                    <span className={`badge ${user.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}>
                      {user.status || '-'}
                    </span>
                  </td>
                  <td>{user.roles?.map((role) => role.name).join(', ') || '-'}</td>
                  <td>
                    {user.status === 'ACTIVE' ? (
                      <button onClick={() => handleBlock(user.id)} className="btn btn-sm btn-danger me-2">
                        Block
                      </button>
                    ) : (
                      <button onClick={() => handleUnblock(user.id)} className="btn btn-sm btn-success me-2">
                        Unblock
                      </button>
                    )}
                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-secondary">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
