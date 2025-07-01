import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

import {
  listAllRequests,
  listPendingRequests,
  listApproved,
  listRejected,
  approveRequest,
  rejectRequest,
} from '../services/adminService';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // Default view mode is 'all'

  // Initialize useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequestsByStatus(viewMode);
  }, [viewMode]);

  const fetchRequestsByStatus = async (statusFilter) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let response;
      switch (statusFilter) {
        case 'all':
          response = await listAllRequests();
          break;
        case 'pending':
          response = await listPendingRequests();
          break;
        case 'approved':
          response = await listApproved();
          break;
        case 'rejected':
          response = await listRejected();
          break;
        default:
          setError('Invalid view mode selected. Please choose a valid filter.');
          setLoading(false);
          return;
      }
      setRequests(response.data);
    } catch (err) {
      setError(`Failed to load ${statusFilter} requests. Please ensure the backend is running and accessible.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, actionType) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      let response;
      if (actionType === 'approve') {
        response = await approveRequest(requestId);
      } else if (actionType === 'reject') {
        response = await rejectRequest(requestId);
      }
      setSuccessMessage(response.data);
      // After action, re-fetch requests based on the current view mode
      fetchRequestsByStatus(viewMode);
    } catch (err) {
      if (err.response) {
        setError(`Failed to ${actionType} request: ${err.response.data}`);
      } else {
        setError(`Failed to ${actionType} request. Network error or server unreachable.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // This function now explicitly navigates to a route that should trigger your NotFound page.
  // In react-router-dom, `*` as a path in a <Route> component acts as a catch-all.
  // Navigating to `*` directly in `useNavigate` will push that literal string to the URL,
  // which your Router should then match with the catch-all route.
  const handleExcelButtonClick = () => {
    navigate('*');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const requestsToDisplay = requests;
  const currentViewTitle = `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Signup Requests`;

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading requests...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <div className="d-flex align-items-center">
          <Button
            variant="primary"
            className="me-2"
            onClick={handleExcelButtonClick} // Calls the function that navigates to '*'
          >
            View/Upload Excel
          </Button>
          <DropdownButton
            id="dropdown-view-mode"
            title={`${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Requests`}
            variant="primary"
            disabled={loading}
          >
            <Dropdown.Item onClick={() => setViewMode('all')} active={viewMode === 'all'}>
              View all Requests
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setViewMode('pending')} active={viewMode === 'pending'}>
              View Pending Requests
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setViewMode('approved')} active={viewMode === 'approved'}>
              View Approved Requests
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setViewMode('rejected')} active={viewMode === 'rejected'}>
              View Rejected Requests
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <h3 className="mb-3 text-center">{currentViewTitle}</h3>

      {requestsToDisplay.length === 0 ? (
        <Alert variant="info" className="text-center">
          {viewMode === 'all'
            ? 'No signup requests found.'
            : `No ${viewMode.toLowerCase()} signup requests at the moment.`}
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {requestsToDisplay.map((request) => (
            <Col key={request.id}>
              <Card>
                <Card.Header>
                  <strong>Request ID: {request.id}</strong>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Email: {request.email}</Card.Title>
                  <Card.Text>
                    <strong>Requested Role:</strong>{' '}
                    <Badge bg="info" className="me-2">{request.requestedRole}</Badge>
                    <br />
                    <strong>Current Status:</strong>{' '}
                    <Badge bg={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                  </Card.Text>
                  {request.status === 'PENDING' && (
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="success"
                        onClick={() => handleAction(request.id, 'approve')}
                        disabled={loading}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleAction(request.id, 'reject')}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {request.status !== 'PENDING' && viewMode === 'all' && (
                    <Alert variant="secondary" className="mt-3 text-center py-2">
                      This request has been {request.status.toLowerCase()}.
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default AdminDashboard;