import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'; 

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReadUpload = () => {
    navigate('/upload-excel');
  };

  return (
    <Navbar className="custom-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand className="brand-logo" href="/">
          ExcelDashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-anim" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {token && (
              <>
                <Button
                  className="nav-button glow-btn me-2 mb-2 mb-lg-0"
                  onClick={handleReadUpload}
                >
                  Read / Upload
                </Button>
                <Button
                  className="nav-button glow-btn mb-2 mb-lg-0"
                  onClick={handleLogout}
                >
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
