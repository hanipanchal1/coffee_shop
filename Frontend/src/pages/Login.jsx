import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";

// ─────────────────────────────────────────────────────────────
//  Login Page  –  Manual (email/password) + Google OAuth
//
//  Manual Login flow:
//    1. User fills email & password → clicks Submit
//    2. POST /auth/login  → backend returns { token, user, msg }
//    3. We call login(token, user) → saves to localStorage + sets state
//    4. We check user.role:
//         admin → navigate('/admin')
//         user  → navigate('/')
//
//  Google Login flow:
//    1. User clicks Google button
//    2. Browser redirects to http://localhost:1000/google
//    3. Google handles consent → backend redirects to /auth-success?token=...
//    4. AuthSuccess.jsx takes over from there
// ─────────────────────────────────────────────────────────────

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:1000/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ Save token in localStorage + set global user state
      login(token, user);

      toast.success(res.data.msg || "Logged in successfully!");

      // ✅ Role-based redirect
      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    // Google OAuth requires a full browser redirect (NOT axios)
    // Backend will handle the OAuth flow and redirect back to /auth-success
    window.location.href = "http://localhost:1000/google";
  }

  return (
    <div className="bg-[url('../src/assets/img/menu/bgmenuimg.png')] w-full h-[82.7vh] bg-center bg-cover text-white flex flex-col justify-center items-center gap-5">
      <p className="text-3xl font-serif">Login!</p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <input
          className="text-[18px] border-b py-2 w-[30vw] flex px-5 border-[#929292] bg-transparent outline-none"
          type="email"
          placeholder="E-mail*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-[18px] border-b py-2 border-[#929292] w-[30vw] flex px-5 bg-transparent outline-none"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#c5a572] w-30 flex items-center justify-center mt-5 py-3 px-6 rounded-xl disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Submit"}
        </button>

        <p className="text-[17px] py-3">
          Not Registered?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#c5a572] underline"
          >
            Create an account
          </button>
        </p>

        {/* Google Login Button */}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#929292] hover:bg-white hover:text-black transition-colors"
          onClick={handleGoogleLogin}
        >
          <FaGoogle />
          <span className="text-sm">Login with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
