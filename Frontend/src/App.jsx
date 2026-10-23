import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import BDetails from "./pages/BDetails";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AuthSuccess from "./pages/AuthSuccess";
import Nav from "./componets/Nav";
import ProtectedRoute from "./componets/ProtectedRoute";

// ─────────────────────────────────────────────────────────────
//  App  –  All routes defined here
//
//  Public routes  → anyone can visit
//  Protected      → must be logged in
//  Admin-only     → must be logged in AND role === 'admin'
// ─────────────────────────────────────────────────────────────

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/blog/detail" element={<BDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Google OAuth Landing Page ──
            Backend redirects here after Google login:
            http://localhost:5173/auth-success?token=eyJ... */}
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* ── Admin-Only Route ──
            Only logged-in users with role='admin' can see this.
            Others are redirected to / */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ── 404 Catch-all ── */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
