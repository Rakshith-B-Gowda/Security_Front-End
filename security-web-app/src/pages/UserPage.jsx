import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { requestRead, requestUpload, getUserByEmail } from '../services/userService';
import UserNavbar from '../components/UserNavbar';

const UserPage = () => {
  const email = localStorage.getItem('email');
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

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
  );
};

export default UserPage;
