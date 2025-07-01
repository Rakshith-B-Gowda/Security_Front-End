import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signup as signupApi } from '../services/authService';
import '../css/SignUpPage.css';

const validateName = (name) => {
  if (!name) return 'Name is required.';
  if (name.length < 3) return 'Name must be at least 3 characters.';
  return '';
};

const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const re = /^\S+@\S+\.\S+$/;
  if (!re.test(email)) return 'Enter a valid email address.';
  return '';
};

const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return '';
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
};

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setErrors({ name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });
    setSubmitted(true);
    setAuthMessage({ type: '', text: '' });

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      setLoading(true);
      try {
        const result = await signupApi({ name, email, password });
        setAuthMessage({ type: 'success', text: result });
        setTimeout(() => navigate('/login'), 1200);
      } catch (err) {
        setAuthMessage({ type: 'danger', text: err.message || 'Signup failed.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container fluid className="p-3 my-5">
      <Row>
        <Col md={6}>
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            fluid
            alt="Illustration"
          />
        </Col>
        <Col md={6}>
          <div className="signup-container">
            <h2 className="mb-4">Create an account</h2>
            {authMessage.text && (
              <Alert variant={authMessage.type}>{authMessage.text}</Alert>
            )}
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={submitted && !!errors.name}
                  disabled={loading}
                />
                {submitted && errors.name && (
                  <Form.Text className="text-danger">{errors.name}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
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

              <Form.Group className="mb-3" controlId="formPassword">
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
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                {submitted && errors.password && (
                  <Form.Text className="text-danger">{errors.password}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={submitted && !!errors.confirmPassword}
                    disabled={loading}
                  />
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                {submitted && errors.confirmPassword && (
                  <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="signup-link">Login</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
