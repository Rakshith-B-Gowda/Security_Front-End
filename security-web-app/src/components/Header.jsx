import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ExcelDashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
