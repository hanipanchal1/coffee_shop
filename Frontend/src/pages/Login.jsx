import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";
import { API_BASE_URL } from "../utils/api";
import SEO from "../componets/SEO";
import bgmenuimg from "../assets/img/menu/bgmenuimg.png";
import { loginSchema } from "../utils/validationSchemas";

// ─────────────────────────────────────────────────────────────
//  Login Page  —  Zod + react-hook-form validation
// ─────────────────────────────────────────────────────────────

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const { token, user } = res.data;
      login(token, user);
      toast.success(res.data.msg || "Logged in successfully!");
      reset();

      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
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
    window.location.href = `${API_BASE_URL}/google`;
  }

  return (
    <div
      className="
        relative w-full min-h-screen
        bg-[#101d28] bg-cover bg-center bg-no-repeat
        text-white
        flex flex-col justify-center items-center
        px-4 sm:px-6 md:px-8
        py-10 sm:py-12
      "
      style={{ backgroundImage: `url(${bgmenuimg})` }}
    >
      <SEO
        title="Login"
        description="Sign in to Coffee Shop to access your account, track orders, and manage reservations."
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none flex flex-col items-center gap-5 sm:gap-6">
        <p className="text-2xl sm:text-3xl font-serif tracking-wide text-center">
          Login!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full flex flex-col gap-4 sm:gap-5 justify-center items-center"
        >
          {/* Email */}
          <div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw] flex flex-col gap-1">
            <input
              {...register("email")}
              className={`
                w-full text-base sm:text-[17px] md:text-[18px]
                border-b py-2.5 sm:py-2 px-4 sm:px-5
                bg-transparent outline-none
                placeholder:text-white/70
                transition-colors
                ${errors.email ? "border-red-400" : "focus:border-[#c5a572]"}
              `}
              type="email"
              placeholder="E-mail*"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs px-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw] flex flex-col gap-1">
            <input
              {...register("password")}
              className={`
                w-full text-base sm:text-[17px] md:text-[18px]
                border-b py-2.5 sm:py-2 px-4 sm:px-5
                bg-transparent outline-none
                placeholder:text-white/70
                transition-colors
                ${errors.password ? "border-red-400" : "focus:border-[#c5a572]"}
              `}
              type="password"
              placeholder="Password*"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs px-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
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
              text-sm sm:text-base font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
              hover:bg-[#b8945e] active:scale-[0.98] transition-all
            "
          >
            {loading ? "Logging in..." : "Submit"}
          </button>

          {/* Register link */}
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

          {/* Google Login */}
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
              text-sm
              w-full max-w-60 sm:w-auto
            "
          >
            <FaGoogle className="text-base" />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
