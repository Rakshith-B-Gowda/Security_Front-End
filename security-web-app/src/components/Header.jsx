import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handler for the "Read/Upload" button
  const handleReadUpload = () => {
    // You'll need to define where this button should navigate to.
    // For example, if you have a page for file uploads/reads:
    navigate('/upload-excel'); // Replace with your actual route for upload/read
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ExcelDashboard</Navbar.Brand>
        <Nav className="ms-auto">
          {token && (
            <>
              {/* Read/Upload Button */}
              <Button
                variant="outline-light" // You can change the variant if needed
                onClick={handleReadUpload}
                className="me-2" // Add margin-right to separate it from Logout
              >
                Read/Upload
              </Button>

              {/* Logout Button */}
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}