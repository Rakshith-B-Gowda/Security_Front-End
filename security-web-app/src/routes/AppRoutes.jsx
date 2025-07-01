import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteLoader from '../common/RouteLoader';
import NotFound from '../common/NotFound';
import Home from '../pages/Home';

// Lazy load components for better performance
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard')); // Import your AdminDashboard
const UserPage = lazy(() =>import('../pages/UserPage'));

// Authentication check: use sessionStorage token
const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

// PublicRoute: Only accessible to unauthenticated users.
// If authenticated, redirects to the home page.
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
}

// PrivateRoute: Only accessible to authenticated users.
// If not authenticated, redirects to the login page.
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
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
        {/* Protected Home route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* 404 Not Found Route - Always keep this last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}