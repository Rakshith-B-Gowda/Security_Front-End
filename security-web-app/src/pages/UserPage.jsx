import React from 'react';
import { Container, Card } from 'react-bootstrap';
import UserNavbar from '../components/UserNavbar';
import "../css/UserPage.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const UserPage = ({ user }) => {
  const navigate = useNavigate();
  if (!user) return <div>No user data found.</div>;

  const handleRaiseRequest = () => {
    navigate('/raise-request');
  };
  const getAccessMessage = () => {
    switch (user.permission) {
      case 'READ_UPLOAD':
        return 'You have read and upload access. You can view data and upload new entries.';
      case 'READ':
        return 'You have read access. You can view data but cannot upload new entries.';
      case 'default':
      default:
        return 'You do not have any accesses yet. Please raise a request.';
    }
  };

  return (
    <>
      <UserNavbar user={user} />
      <div className="userpage-bg my-2">
      <Container className="userpage-container">
  <div className="d-flex justify-content-start mb-2 mx-3">
    <Button
      className="nav-button glow-btn"
      onClick={handleRaiseRequest}
    >
      Raise Request
    </Button>
  </div>

          <Card className="mb-4 userpage-card userpage-welcome-card">
            <Card.Body className="text-center">
              <h2 className="userpage-welcome-title">
                Welcome, {user.name}!
              </h2>
              <div className="userpage-welcome-role">
                You are logged in as <b>{user.role}</b>.
              </div>
            </Card.Body>
          </Card>

          <Card className="userpage-card userpage-message-card-wrapper">
            <Card.Body className="userpage-message-card info">
              <Card.Text className="userpage-message-text">
                {getAccessMessage()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
