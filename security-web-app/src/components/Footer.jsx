import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar bg="primary" variant="dark" className="mt-auto">
      <Container className="justify-content-center">
        <Navbar.Text className="text-white">
          &copy; {new Date().getFullYear()} ExcelDashboard
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
