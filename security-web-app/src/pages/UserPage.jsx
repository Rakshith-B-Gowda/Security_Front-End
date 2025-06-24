import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../services/userService';

const UserPage = (props) => {
  const [user, setUser] = useState(null);
  const [userFromHome, setUserFromHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If user is passed as a prop (from Home), destructure and set
  useEffect(() => {
    if (props.user) {
      setUserFromHome(props.user);
    }
  }, [props.user]);

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
      {/* If userFromHome exists, show its details too */}
      {userFromHome && (
        <div style={{ marginTop: '1rem' }}>
          <h4>From Home.jsx (prop):</h4>
          <div>Name: {userFromHome.name}</div>
          <div>Role: {userFromHome.role}</div>
          <div>Email: {userFromHome.email}</div>
          <div>Permission: {userFromHome.permission}</div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
