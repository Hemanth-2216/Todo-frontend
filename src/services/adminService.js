import api from "../utils/api"; // Ensure api has baseURL set properly

// ✅ Get all users (except DELETED)
export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/admin/users");
    console.log("API Raw Response:", response);
    console.log("API Response Data:", response.data);
    console.log(
      "Type of response.data:",
      typeof response.data,
      Array.isArray(response.data) ? "Array" : "Not Array"
    );
    return response.data; // Make sure to return only data (array)
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ✅ Block user by ID
export const blockUser = async (id) => {
  try {
    const response = await api.put(`/api/admin/block/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

// ✅ Unblock user by ID
export const unblockUser = async (id) => {
  try {
    const response = await api.put(`/api/admin/unblock/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};

// ✅ Soft delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.put(`/api/admin/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
