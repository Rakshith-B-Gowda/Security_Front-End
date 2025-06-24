import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { requestRead, requestUpload } from '../services/userService';
import UserNavbar from '../components/UserNavbar';

const UserPage = ({ user }) => {
  const [loading, setLoading] = React.useState(false);

  const handleView = async () => {
    try {
      setLoading(true);
      await requestRead(user.id);
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
      await requestUpload(user.id);
      alert('Upload Request Sent!');
    } catch (err) {
      console.error(err);
      alert('Failed to send upload request.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>No user data found.</div>;

  return (
    <>
      <UserNavbar user={user} />
      <Container className="text-center mt-5">
        <h2 className="mb-5">Welcome, {user.name}!</h2>
        <Row className="justify-content-center gap-4">
          <Col xs={12} md={4}>
            <Card border="primary" className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Read Request</Card.Title>
                <Card.Text>Request read access from admin.</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={handleView}
                  disabled={loading}
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
                  disabled={loading}
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
