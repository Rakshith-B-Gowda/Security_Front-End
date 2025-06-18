import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Authentication check: use sessionStorage token
const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

export default function NotFound() {
  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <p>The page you are looking for does not exist.</p>
          {isAuthenticated() ? (
            <Button as={Link} to="/" variant="primary" className="mt-3">
              Go to Home
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="primary" className="mt-3">
              Go to Login
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
