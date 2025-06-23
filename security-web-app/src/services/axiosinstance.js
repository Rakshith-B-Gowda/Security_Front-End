import axios from 'axios';
import { API_BASE_URL } from './api';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL, // Use centralized API base URL
    timeout: 5000, // Set timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add authorization token or other headers if needed
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Process response data
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response && error.response.status === 401) {
            // Example: Redirect to login page if unauthorized
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;