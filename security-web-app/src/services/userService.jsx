import axiosInstance from './axiosInstance';

// Create a new user
export const createUser = (userDto) =>
  axiosInstance.post('/user/adduser', userDto);

// Get all users
export const getAllUsers = () =>
  axiosInstance.get('/user/all');

// Get user by ID
export const getUserById = (id) =>
  axiosInstance.get(`/user/${id}`);

// Request read permission from admin
export const requestRead = (id) =>
  axiosInstance.post(`/user/${id}/request-read`);

// Request upload permission from admin
export const requestUpload = (id) =>
  axiosInstance.post(`/user/${id}/request-read/upload`);

// Get permission status for a user
export const getPermissionStatus = (id) =>
  axiosInstance.get(`/user/${id}/permission`);

// Admin updates user permission
export const adminUpdatePermission = (updateByAdminDto) =>
  axiosInstance.post('/user/admin/update', updateByAdminDto);

// Get user by email
export const getUserByEmail = (email) =>
  axiosInstance.get(`/user/by-email/${encodeURIComponent(email)}`);
