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

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ExcelDashboard</Navbar.Brand>
        <Nav className="ms-auto">
          {token && (
            <Button variant="outline-light" onClick={handleLogout} className="ms-2">
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
