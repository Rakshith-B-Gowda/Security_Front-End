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

    const styles = {
      success: {
        background: 'linear-gradient(135deg, #d4edda 0%, #bce5cf 100%)',
        borderColor: '#88d0a4',
        color: '#155724',
      },
      error: {
        background: 'linear-gradient(135deg, #f8d7da 0%, #f6c9cf 100%)',
        borderColor: '#e09a9a',
        color: '#721c24',
      },
    };

    const style = styles[messageType] || {};

    return (
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Card style={{ ...style, border: `1px solid ${style.borderColor}`, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <Card.Body>
              <Card.Text style={{ margin: 0, fontWeight: '500' }}>{message}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <UserNavbar user={user} />
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #f8f9fa, #e0ecff)',
          paddingTop: '60px',
          paddingBottom: '60px',
        }}
      >
        <Container className="text-center">
          <h2 style={{ marginBottom: '2rem', fontWeight: '700', color: '#343a40' }}>
            Welcome, {user.name}!
          </h2>

          {renderMessageBox()}

          <Row className="justify-content-center gap-4">
            <Col xs={12} md={4}>
              <Card
                style={{
                  borderRadius: 16,
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: '600', color: '#007bff' }}>
                    Read Request
                  </Card.Title>
                  <Card.Text>Request read access from admin.</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={handleView}
                    disabled={loading}
                    style={{
                      borderRadius: 20,
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#007bff20')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                  >
                    Raise Request
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card
                style={{
                  borderRadius: 16,
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: '600', color: '#28a745' }}>
                    Upload Request
                  </Card.Title>
                  <Card.Text>Request upload access from admin.</Card.Text>
                  <Button
                    variant="outline-success"
                    onClick={handleUpload}
                    disabled={loading}
                    style={{
                      borderRadius: 20,
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#28a74520')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                  >
                    Raise Request
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
