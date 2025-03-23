import api from '../utils/api';

const ADMIN_API_URL = '/api/admin';

// ✅ Get Access Token
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Fetch All Users (Ensure it returns an array)
const getAllUsers = async () => {
  try {
    const response = await api.get(`${ADMIN_API_URL}/users`, getAuthHeaders());
    
    console.log("Fetched Users (Raw):", response.data); // Debugging Log

    if (Array.isArray(response.data)) {
      return response.data; // ✅ Correct format
    } else if (response.data && response.data.users) {
      return response.data.users; // ✅ Handle case if users are inside an object
    } else {
      console.error("Unexpected API Response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data?.message || "Failed to fetch users";
  }
};

// ✅ Block User
const blockUser = async (userId) => {
  try {
    const response = await api.put(`${ADMIN_API_URL}/block/${userId}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to block user";
  }
};

// ✅ Unblock User
const unblockUser = async (userId) => {
  try {
    const response = await api.put(`${ADMIN_API_URL}/unblock/${userId}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to unblock user";
  }
};

// ✅ Delete User
const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`${ADMIN_API_URL}/delete/${userId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete user";
  }
};

export { getAllUsers, blockUser, unblockUser, deleteUser };
