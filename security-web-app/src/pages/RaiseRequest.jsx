import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { requestRead, requestUpload, getUserByEmail } from '../services/userService';
import UserNavbar from '../components/UserNavbar';
import '../css/UserPage.css';

const RaiseRequest = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
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

  const handleView = async () => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');
      await requestRead(user.id);
      setMessage('View Request Sent!');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send view request.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');
      await requestUpload(user.id);
      setMessage('Upload Request Sent!');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send upload request.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const renderMessageBox = () => {
    if (!message) return null;
    return (
      <Card className="userpage-card userpage-message-card-wrapper">
        <Card.Body className={`userpage-message-card ${messageType}`}>
          <Card.Text className="userpage-message-text">{message}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <>
      <UserNavbar user={user} />
      <div className="userpage-bg">
        <Container className="d-flex flex-column align-items-center justify-content-center">
          <Card className="mb-4 userpage-card userpage-welcome-card">
            <Card.Body className="text-center">
              <h2 className="userpage-welcome-title">Raise Request</h2>
              <p className="userpage-welcome-role">Choose which request you'd like to submit.</p>
            </Card.Body>
          </Card>

          {renderMessageBox()}

          <Card className="userpage-card userpage-buttons-card">
            <Card.Body>
              <div className="userpage-buttons-row">
                <div className="userpage-action-card userpage-read-card text-center">
                  <div className="userpage-action-title userpage-read-title">Read Request</div>
                  <div>Request read access from admin.</div>
                  <Button
                    variant="outline-primary"
                    onClick={handleView}
                    disabled={loading}
                    className="userpage-raise-btn"
                  >
                    Raise Request
                  </Button>
                </div>
                <div className="userpage-action-card userpage-upload-card text-center">
                  <div className="userpage-action-title userpage-upload-title">Upload Request</div>
                  <div>Request upload access from admin.</div>
                  <Button
                    variant="outline-success"
                    onClick={handleUpload}
                    disabled={loading}
                    className="userpage-raise-btn"
                  >
                    Raise Request
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default RaiseRequest;
