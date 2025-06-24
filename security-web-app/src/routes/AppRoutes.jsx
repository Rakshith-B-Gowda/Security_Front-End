import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteLoader from '../common/RouteLoader';
import NotFound from '../common/NotFound';



// Lazy load components for better performance
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard')); // Import your AdminDashboard
const UserPage = lazy(() =>import('../pages/UserPage'));

// Authentication check: use sessionStorage token
const isAuthenticated = () => {
  // In a real application, you might also check token validity (e.g., expiry)
  return !!sessionStorage.getItem('token');
};

// PublicRoute: Only accessible to unauthenticated users.
// If authenticated, redirects to the admin dashboard.
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/admin-dashboard" replace />;
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

        {/* Root path "/" - If authenticated, navigate to /admin-dashboard */}
        {/* This effectively makes "/" the entry point that redirects */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/admin-dashboard" replace />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard - Protected Route (where AdminDashboard component is actually rendered) */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />


        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/user-dashboard" replace />
            </PrivateRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserPage/>
            </PrivateRoute>
          }
        />
        {/* 404 Not Found Route - Always keep this last */}
        <Route path="*" element={<NotFound />} />
       
        
      </Routes>
    </Suspense>
  );
}