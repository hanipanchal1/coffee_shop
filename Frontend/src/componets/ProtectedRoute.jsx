import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────────────────────
//  ProtectedRoute
//
//  Usage:
//    <ProtectedRoute>            → any logged-in user can enter
//      <SomeComponent />
//    </ProtectedRoute>
//
//    <ProtectedRoute adminOnly>  → only admin role can enter
//      <Admin />
//    </ProtectedRoute>
//
//  If the user is NOT logged in  → redirects to /login
//  If the user is logged in but NOT admin (adminOnly) → redirects to /
// ─────────────────────────────────────────────────────────────

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    // Not logged in → send to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Logged in but not admin → send to home
    return <Navigate to="/" replace />;
  }

  // All checks passed → render the page
  return children;
};

export default ProtectedRoute;
