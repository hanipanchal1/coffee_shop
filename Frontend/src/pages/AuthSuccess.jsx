import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────────────────────
//  AuthSuccess Page
//
//  How it works (Google Login flow):
//    1. User clicks "Login with Google" on /login
//    2. Browser goes to http://localhost:1000/google  (your backend)
//    3. Google shows consent screen
//    4. Google sends user BACK to http://localhost:1000/google/callback
//    5. Backend creates a JWT token and redirects to:
//         http://localhost:5173/auth-success?token=eyJ...
//    6. THIS PAGE reads ?token= from the URL
//    7. Calls login(token) → saves token in localStorage & sets user state
//    8. Reads the role from the decoded token
//    9. Redirects:
//         admin → /admin
//         user  → /
// ─────────────────────────────────────────────────────────────

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      // No token in URL → something went wrong
      alert("Google login failed. Please try again.");
      navigate("/login", { replace: true });
      return;
    }

    // Save token + set user in global state
    login(token);

    // Decode to read role (login() already sets user but state updates are async,
    // so we decode again here for the immediate redirect decision)
    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(
        atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"))
      );

      if (payload.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#121D27] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c5a572] mx-auto mb-4"></div>
        <p className="text-xl font-serif">Signing you in with Google...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
