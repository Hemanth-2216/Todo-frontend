import api from '../utils/api';

const TODO_API_URL = '/api/todo';

const getUserId = () => {
  return localStorage.getItem('userId');
};

const getAllTasks = async () => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.get(`${TODO_API_URL}/getalltasks/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch tasks';
  }
};

const getTaskById = async (taskId) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.get(`${TODO_API_URL}/gettaskbyId/${userId}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch task';
  }
};

const addTask = async (taskData) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.post(`${TODO_API_URL}/addtask/${userId}`, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to add task';
  }
};

const updateTask = async (taskId, taskData) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.put(`${TODO_API_URL}/updatetask/${userId}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to update task';
  }
};

const deleteTask = async (taskId) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.delete(`${TODO_API_URL}/deletetask/${userId}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to delete task';
  }
};

// Ensure this endpoint exists in your backend
const updateTaskStatus = async (taskId, completed) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not logged in');
  try {
    const response = await api.put(`${TODO_API_URL}/updatetask/${userId}/${taskId}`, { completed });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to update task status';
  }
};

export { getAllTasks, getTaskById, addTask, updateTask, deleteTask, updateTaskStatus };
