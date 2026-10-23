import React, { createContext, useContext, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
//  AuthContext  –  single source of truth for auth state
//
//  What it stores:
//    • user  → decoded user object  { id, email, role, name, ... }
//    • token → JWT string saved in localStorage
//
//  What it exposes:
//    • login(token)  → save token, decode & set user
//    • logout()      → clear token & user
//    • isLoggedIn    → boolean
//    • isAdmin       → boolean (role === 'admin')
// ─────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

// Helper: decode JWT payload WITHOUT a library (base64 decode)
function decodeToken(token) {
  try {
    const base64Payload = token.split(".")[1];
    // atob works in all modern browsers
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // On first render: if a token exists in localStorage, restore user state
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        // Check expiry  (exp is in seconds, Date.now() is ms)
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          // Token expired – clear everything
          logout();
        } else {
          setUser(decoded);
        }
      }
    }
  }, []); // runs only once on mount

  // Call this after a successful login (manual OR Google)
  function login(newToken, userData = null) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = decodeToken(newToken);
    // Merge decoded JWT fields with any extra userData from the API response
    setUser(decoded ? { ...decoded, ...userData } : userData);
  }

  // Call this to log out from anywhere in the app
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  const value = {
    user,        // full user object
    token,       // raw JWT string
    login,       // function(token, userData?)
    logout,      // function()
    isLoggedIn: !!user,         // true / false
    isAdmin: user?.role === "admin",  // true / false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook — import and call useAuth() in any component
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
