import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteLoader from '../common/RouteLoader';
import NotFound from '../common/NotFound';

const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));

// Dummy authentication check (replace with real logic)
const isAuthenticated = () => {
  // e.g., check localStorage for a token
  return false;
};

// PublicRoute: Only for unauthenticated users
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
}

// PrivateRoute: Only for authenticated users
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
        {/* Example private route (replace with your dashboard or home) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div>Home (Private)</div>
            </PrivateRoute>
          }
        />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
