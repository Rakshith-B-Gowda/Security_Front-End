import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import '../css/Footer.css'; 

export default function Footer() {
  return (
    <Navbar className="custom-footer mt-auto">
      <Container className="justify-content-center">
        <Navbar.Text className="footer-text">
          &copy; {new Date().getFullYear()} ExcelDashboard
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
