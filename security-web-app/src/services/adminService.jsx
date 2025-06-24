import axiosInstance from './axiosInstance';

// Add a new signup request
export const addRequest = (addRequestDto) =>
  axiosInstance.post('/admin/requests/addrequest', addRequestDto);

// List all pending signup requests
export const listPendingRequests = () =>
  axiosInstance.get('/admin/requests/pending');

// List all signup requests (pending, approved, rejected)
export const listAllRequests = () =>
  axiosInstance.get('/admin/requests/all');

// Approve a specific signup request
export const approveRequest = (id) =>
  axiosInstance.put(`/admin/requests/approve/${id}`);

// Reject a specific signup request
export const rejectRequest = (id) =>
  axiosInstance.put(`/admin/requests/reject/${id}`);

// List all approved requests
export const listApproved = () =>
  axiosInstance.get('/admin/requests/approvedlist');

// List all rejected requests
export const listRejected = () =>
  axiosInstance.get('/admin/requests/rejectedlist');
