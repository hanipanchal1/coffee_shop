import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";

// ─────────────────────────────────────────────────────────────
//  Login Page  –  Fully Responsive (Mobile → Tablet → Desktop)
//  Desktop design remains identical to original
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

      login(token, user);

      toast.success(res.data.msg || "Logged in successfully!");

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
    window.location.href = "http://localhost:1000/google";
  }

  return (
    <div
className="
      relative w-full min-h-screen
      bg-[url('../src/assets/img/menu/bgmenuimg.png')] 
      bg-center bg-cover bg-no-repeat
      text-white 
      flex flex-col justify-center items-center 
      px-4 sm:px-6 md:px-8
      py-10 sm:py-12
    "
  >
    {/* Optional dark overlay for better readability */}
    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

    <p className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none flex flex-col items-center gap-5 sm:gap-6">
          Login!
        </p>

        <form
          onSubmit={handleLogin}
          className="
            w-full 
            flex flex-col gap-4 sm:gap-5 
            justify-center items-center
          "
        >
          {/* Email Input */}
          <input
            className="
              w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw]
              text-base sm:text-[17px] md:text-[18px]
              border-b 
              py-2.5 sm:py-2 
              px-4 sm:px-5
              bg-transparent outline-none
              placeholder:text-white/70
              focus:border-[#c5a572] transition-colors
            "
            type="email"
            placeholder="E-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          {/* Password Input */}
          <input
            className="
              w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw]
              text-base sm:text-[17px] md:text-[18px]
              border-b 
              py-2.5 sm:py-2 
              px-4 sm:px-5
              bg-transparent outline-none
              placeholder:text-white/70
              focus:border-[#c5a572] transition-colors
            "
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-4 sm:mt-5
              bg-[#c5a572] 
              w-full max-w-50 sm:w-32 md:w-30
              flex items-center justify-center 
              py-3 px-6 
              rounded-xl 
              text-sm sm:text-base
              font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
              hover:bg-[#b8945e] active:scale-[0.98] transition-all
            "
          >
            {loading ? "Logging in..." : "Submit"}
          </button>

          {/* Register Link */}
          <p className="text-[15px] sm:text-[16px] md:text-[17px] py-2 sm:py-3 text-center">
            Not Registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#c5a572] underline hover:text-[#d4b88a] transition-colors"
            >
              Create an account
            </button>
          </p>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              flex items-center justify-center gap-2 
              px-5 py-2.5 sm:px-4 sm:py-2
              rounded-full 
              bg-[#929292] 
              hover:bg-white hover:text-black 
              active:scale-[0.98]
              transition-all duration-200
              text-sm sm:text-sm
              w-full max-w-60 sm:w-auto
            "
          >
            <FaGoogle className="text-base" />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
  );
};

export default Login;