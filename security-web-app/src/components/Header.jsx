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
    navigate('/upload-excel'); // Replace with your actual route for upload/read
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand href="/">ExcelDashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {token && (
              <>
                {/* Show buttons always, let Navbar handle collapse/expand */}
                <Button
                  variant="outline-light"
                  onClick={handleReadUpload}
                  className="me-2 mb-2 mb-lg-0"
                >
                  Read/Upload
                </Button>
                <Button variant="outline-light" onClick={handleLogout} className="mb-2 mb-lg-0">
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}