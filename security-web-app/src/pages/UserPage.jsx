import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../services/userService';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      setError('No email found in local storage.');
      setLoading(false);
      return;
    }
    getUserByEmail(email)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div>
      <h2>Welcome, User, Name: {user.data.name}, Role: {user.data.role}, Email: {user.data.email} !</h2>
      {/* You can display more user details here if needed */}
    </div>
  );
};

export default UserPage;
