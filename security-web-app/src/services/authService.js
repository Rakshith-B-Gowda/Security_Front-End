import { apiUrl } from './api';

export async function login({ email, password }) {
  const response = await fetch(apiUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) {
    // Backend sends { token: 'Login failed' } or similar
    throw new Error(data.token || 'Login failed');
  }
  return data; // { token: ... }
}

export async function signup({ name, email, password }) {
  const response = await fetch(apiUrl('/auth/signup'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || 'Signup failed');
  }
  return text; // 'Sign-up successful' or error string
}
