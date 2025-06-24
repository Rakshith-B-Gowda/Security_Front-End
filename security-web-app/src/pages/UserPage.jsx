import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { requestRead, requestUpload, getUserByEmail } from '../services/userService';
import UserNavbar from '../components/UserNavbar';

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
    if (email) {
      getUserByEmail(email)
        .then((res) => {
          console.log('Response:', res);
          setUserId(res.data.id);
          setUserName(res.data.name);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          alert('Unable to load user info.');
        });
    }
  }, [email]);

  const handleView = async () => {
    try {
      setLoading(true);
      await requestRead(userId);
      alert('View Request Sent!');
    } catch (err) {
      console.error(err);
      alert('Failed to send view request.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      await requestUpload(userId);
      alert('Upload Request Sent!');
    } catch (err) {
      console.error(err);
      alert('Failed to send upload request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar email={email} />
      <Container className="text-center mt-5">
        <h2 className="mb-5">Welcome, {userName}!</h2>

        <Row className="justify-content-center gap-4">
          <Col xs={12} md={4}>
            <Card border="primary" className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Read Request</Card.Title>
                <Card.Text>Request read access from admin.</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={handleView}
                  disabled={!userId || loading}
                >
                   Raise Request
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card border="success" className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Upload Request</Card.Title>
                <Card.Text>Request upload access from admin.</Card.Text>
                <Button
                  variant="outline-success"
                  onClick={handleUpload}
                  disabled={!userId || loading}
                >
                   Raise Request
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
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
