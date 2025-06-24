import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9092/admin/requests';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // Default view mode is 'all'

  useEffect(() => {
    fetchRequestsByStatus(viewMode);
  }, [viewMode]);

  const fetchRequestsByStatus = async (statusFilter) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let endpoint;
    switch (statusFilter) {
      case 'all':
        endpoint = `${API_BASE_URL}/all`;
        break;
      case 'pending':
        endpoint = `${API_BASE_URL}/pending`;
        break;
      case 'approved':
        endpoint = `${API_BASE_URL}/approvedlist`;
        break;
      case 'rejected':
        endpoint = `${API_BASE_URL}/rejectedlist`;
        break;
      default:
        console.error('Invalid status filter:', statusFilter);
        setError('Invalid view mode selected. Please choose a valid filter.');
        setLoading(false);
        return;
    }

    try {
      const response = await axios.get(endpoint);
      setRequests(response.data);
    } catch (err) {
      console.error(`Error fetching ${statusFilter} requests:`, err);
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
      const endpoint = `${API_BASE_URL}/${actionType}/${requestId}`;
      const response = await axios.put(endpoint);
      setSuccessMessage(response.data);
      fetchRequestsByStatus(viewMode); // Re-fetch based on current viewMode
    } catch (err) {
      console.error(`Error ${actionType}ing request:`, err);
      if (err.response) {
        setError(`Failed to ${actionType} request: ${err.response.data}`);
      } else {
        setError(`Failed to ${actionType} request. Network error or server unreachable.`);
      }
    } finally {
      setLoading(false);
    }
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

  // Determine which list of requests to display based on the current viewMode
  // This line was already present in the previous code and correctly defines 'requestsToDisplay'.
  const requestsToDisplay = requests; // 'requests' directly holds the filtered data now

  // --- ADD THIS BLOCK ---
  // Define currentViewTitle here before it's used in the JSX
  const currentViewTitle = `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Signup Requests`;
  // If you prefer a more specific title for "All", you could do:
  // const currentViewTitle = viewMode === 'all' ? 'All Signup Requests' : `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Signup Requests`;
  // --- END ADD THIS BLOCK ---


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
        <DropdownButton
          id="dropdown-view-mode"
          title={`View  ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Requests`}
          variant="primary"
          disabled={loading}
        >
          <Dropdown.Item onClick={() => setViewMode('all')} active={viewMode === 'all'}>
            All Requests
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setViewMode('pending')} active={viewMode === 'pending'}>
            Pending Requests
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setViewMode('approved')} active={viewMode === 'approved'}>
            Approved Requests
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setViewMode('rejected')} active={viewMode === 'rejected'}>
            Rejected Requests
          </Dropdown.Item>
        </DropdownButton>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <h3 className="mb-3 text-center">{currentViewTitle}</h3> {/* This is where it was undefined */}

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