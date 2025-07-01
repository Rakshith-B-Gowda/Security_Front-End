import axios from 'axios';
import { API_BASE_URL } from './api';


const axiosInstance = axios.create({
    baseURL: API_BASE_URL, 
    timeout: 5000, 
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        
        const token = sessionStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
       
        return response;
    },
    (error) => {
        
        if (error.response && error.response.status === 401) {
           
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;