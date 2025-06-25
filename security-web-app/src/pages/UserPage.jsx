import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { requestRead, requestUpload } from '../services/userService';
import UserNavbar from '../components/UserNavbar';
import "../css/UserPage.css";

const UserPage = ({ user }) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');

  const handleView = async () => {
    try {
      setLoading(true);
      setMessage('');
      setMessageType('');
      await requestRead(user.id);
      setMessage('View Request Sent!');
      setMessageType('success');
    } catch (err) {
      console.error(err);
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
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to send upload request.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>No user data found.</div>;

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


  return (
    <>
      <UserNavbar user={user} />
      <div className="userpage-bg">
        <Container className="d-flex flex-column align-items-center justify-content-center">
          {/* Welcome Card */}
          <Card className="mb-4 userpage-card userpage-welcome-card">
            <Card.Body className="text-center">
              <h2 className="userpage-welcome-title">
                Welcome, {user.name}!
              </h2>
              <div className="userpage-welcome-role">You are logged in as <b>{user.role}</b>.</div>
            </Card.Body>
          </Card>

          {/* Message Box */}
          {renderMessageBox()}

          {/* Buttons Card */}
          <Card className="userpage-card userpage-buttons-card">
            <Card.Body>
              <div className="userpage-buttons-row">
                <div className="userpage-action-card userpage-read-card">
                  <div className="text-center">
                    <div className="userpage-action-title userpage-read-title">
                      Read Request
                    </div>
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
                </div>
                <div className="userpage-action-card userpage-upload-card">
                  <div className="text-center">
                    <div className="userpage-action-title userpage-upload-title">
                      Upload Request
                    </div>
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
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
