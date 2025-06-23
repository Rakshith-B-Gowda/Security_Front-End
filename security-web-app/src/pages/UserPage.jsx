import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosinstance';

const UserPage = () => {
  const email = localStorage.getItem('email'); // Fetch email from local storage

  console.log("got email: ", email);
  const [userId, setUserId] = useState(null);
  const [fetchingId, setFetchingId] = useState(false);

  return (
    <div></div>
  );
};

export default UserPage;
