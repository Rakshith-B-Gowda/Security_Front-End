import axios from 'axios';
import { apiUrl } from './api';

export async function login({ email, password }) {
  try {
    const response = await axios.post(apiUrl('/auth/login'), { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data; // { token: ... }
  } catch (error) {
    const message = error.response?.data?.token || 'Login failed';
    throw new Error(message);
  }
}

export async function signup({ name, email, password }) {
  try {
    const response = await axios.post(apiUrl('/auth/signup'), { name, email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data; 
  } catch (error) {
    const message = error.response?.data || 'Signup failed';
    throw new Error(message);
  }
}
