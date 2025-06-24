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
        console.log(user);
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
  if(user){
    console.log(user);
  }

  return (
    <div>
      <h2>Welcome, { user.data.name} {user.data.id} {user.data.email} !</h2>
      {/* You can display more user details here if needed */}
    </div>
  );
};

export default UserPage;
