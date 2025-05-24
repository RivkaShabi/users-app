import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5000/api/users';

// Helper to get auth headers for requests
const getAuthHeaders = (username: string) => {
  const token = localStorage.getItem(`token_${username}`);
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all users for a given page and username
export const getAllUsers = async (page: number, username: string) => {
  try {
    console.log(`[getAllUsers] Fetching users for page ${page}, username: ${username}`);
    const res = await axios.post(
      `${BASE_URL}/getUsers?page=${page}`,
      { username },
      {
        headers: getAuthHeaders(username),
      }
    );
    return res.data;
  } catch (error: any) {
    // Show error toast and log
    toast.error(`Error: ${error.message} (status ${error.status})`);
    console.error('[getAllUsers] Error:', error);
    return null;
  }
};

// Fetch a user by ID
export const getUserById = async (id: number, username: string) => {
  try {
    console.log(`[getUserById] Fetching user id: ${id}, username: ${username}`);
    const res = await axios.get(`${BASE_URL}/getUser/${id}`, {
      headers: getAuthHeaders(username),
    });
    return res;
  } catch (error: any) {
    toast.error(`Error fetching user by ID: ${error.message} (status ${error.status})`);
    console.error('[getUserById] Error:', error);
    return null;
  }
};

// Create a new user
export const createUser = async (userData, username: string) => {
  try {
    console.log('[createUser] Creating user:', userData);
    const res = await axios.post(
      `${BASE_URL}/createUser`,
      { ...userData, createdBy: username },
      {
        headers: getAuthHeaders(username),
      }
    );
    return res;
  } catch (error: any) {
    toast.error(`Error creating user: ${error.message} (status ${error.status})`);
    console.error('[createUser] Error:', error);
    return null;
  }
};

// Update an existing user
export const updateUser = async (userData, username: string) => {
  try {
    console.log('[updateUser] Updating user:', userData);
    const res = await axios.put(`${BASE_URL}/updateUser/${userData.id}`, userData, {
      headers: getAuthHeaders(username),
    });
    return res;
  } catch (error: any) {
    toast.error(`Error updating user: ${error.message} (status ${error.status})`);
    console.error('[updateUser] Error:', error);
    return null;
  }
};

// Delete a user by ID
export const deleteUser = async (id: number, username: string) => {
  try {
    console.log(`[deleteUser] Deleting user id: ${id}, username: ${username}`);
    const res = await axios.delete(`${BASE_URL}/deleteUser/${id}`, {
      headers: getAuthHeaders(username),
    });
    return res;
  } catch (error: any) {
    toast.error(`Error deleting user: ${error.message} (status ${error.status})`);
    console.error('[deleteUser] Error:', error);
    return null;
  }
};
