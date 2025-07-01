import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteLoader from '../common/RouteLoader';
import NotFound from '../common/NotFound';
import Home from '../pages/Home';
import RaiseRequest from '../pages/RaiseRequest';
import { useAuth } from '../context/AuthContext';

// Lazy load components for performance
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const UserPage = lazy(() => import('../pages/UserPage'));

// Auth check
const isAuthenticated = () => !!sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user') || 'null');

// PublicRoute: only accessible if not logged in
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
}

// PrivateRoute: only accessible if logged in
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPage user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/raise-request"
          element={
            <PrivateRoute>
              <RaiseRequest user={user} />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
