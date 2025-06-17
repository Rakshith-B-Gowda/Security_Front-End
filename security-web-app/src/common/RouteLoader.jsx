import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

export default function RouteLoader() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Row>
        <Col>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
}
