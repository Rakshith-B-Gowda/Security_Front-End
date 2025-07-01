import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import '../css/LoginPage.css'; 

const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email) ? '' : 'Enter a valid email address.';
};

const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  return password.length < 6 ? 'Password must be at least 6 characters.' : '';
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    setSubmitted(true);
    setAuthMessage({ type: '', text: '' });
    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        const data = await loginApi({ email, password });
        if (data.token && !data.token.toLowerCase().includes('failed')) {
          login(data.token);
          localStorage.setItem('email', email);
          setAuthMessage({ type: 'success', text: 'Login successful! Redirecting...' });
          setTimeout(() => navigate('/'), 1200);
        } else {
          setAuthMessage({ type: 'danger', text: 'Invalid email or password.' });
        }
      } catch (err) {
        setAuthMessage({ type: 'danger', text: err.message || 'Login failed.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page-bg">
      <Container fluid className="login-container px-4 py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center fade-image">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              fluid
              alt="Illustration"
            />
          </Col>
          <Col md={6}>
            <div className="glassy-card">
              <h2>Login to your account</h2>
              {authMessage.text && (
                <Alert variant={authMessage.type} className="text-center">
                  {authMessage.text}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={submitted && !!errors.email}
                    disabled={loading}
                  />
                  {submitted && errors.email && (
                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={submitted && !!errors.password}
                      disabled={loading}
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                  {submitted && errors.password && (
                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 button-fancy"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <span>Don't have an account? </span>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
