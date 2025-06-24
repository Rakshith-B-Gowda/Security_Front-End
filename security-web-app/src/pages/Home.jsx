import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../services/userService';
import UserPage from './UserPage';
import AdminDashboard from './AdminDashboard';

const Home = () => {
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
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch user details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  // Render based on user role
  if (user.role === 'ADMIN') {
    return (
      <div>
        <AdminDashboard user={user} />
      </div>
    );
  }
  if (user.role === 'USER') {
    return <UserPage user={user} />;
  }
  return <div>Unknown role.</div>;
};

export default Home;
