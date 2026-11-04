import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../utils/toast";
import { API_BASE_URL } from "../utils/api";
import SEO from "../componets/SEO";
import bgmenuimg from "../assets/img/menu/bgmenuimg.png";
import { registerSchema } from "../utils/validationSchemas";

// ─────────────────────────────────────────────────────────────
//  Register Page  —  Zod + react-hook-form validation
// ─────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", role: "user" },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      toast.success(res.data.msg || "Registered successfully!");
      reset();
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Registration failed.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        relative w-full min-h-[calc(100vh-70px)]
        bg-[#101d28] bg-cover bg-center bg-no-repeat
        text-white
        flex flex-col justify-center items-center
        px-4 sm:px-6 md:px-8
        py-10 sm:py-12
      "
      style={{ backgroundImage: `url(${bgmenuimg})` }}
    >
      <SEO
        title="Register"
        description="Create your Coffee Shop account to book tables, track orders, and enjoy personalised offers."
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none flex flex-col items-center gap-5 sm:gap-6">
        <p className="text-2xl sm:text-3xl md:text-3xl font-serif tracking-wide text-center">
          Register!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full flex flex-col gap-4 sm:gap-5 justify-center items-center"
        >
          {/* Full Name */}
          <div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw] flex flex-col gap-1">
            <input
              {...register("name")}
              className={`
                w-full text-base sm:text-[17px] md:text-[18px]
                border-b py-2.5 sm:py-2 px-4 sm:px-5
                bg-transparent outline-none
                placeholder:text-white/70
                transition-colors
                ${errors.name ? "border-red-400" : "focus:border-[#c5a572]"}
              `}
              type="text"
              placeholder="Full Name*"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs px-1">{errors.name.message}</p>
            )}
          </div>

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
                border-b border-[#929292] py-2.5 sm:py-2 px-4 sm:px-5
                bg-transparent outline-none
                placeholder:text-white/70 transition-colors
                ${errors.password ? "border-red-400" : ""}
              `}
              type="password"
              placeholder="Password*"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs px-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role Selector */}
          <div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw] flex flex-col gap-1">
            <select
              {...register("role")}
              className="
                w-full text-[15px] sm:text-[16px]
                border-b py-2.5 sm:py-2 px-4 sm:px-5
                bg-transparent outline-none text-white
                focus:border-[#c5a572] transition-colors
                appearance-none cursor-pointer
              "
            >
              <option value="user" className="text-black bg-white">
                User
              </option>
              <option value="admin" className="text-black bg-white">
                Admin
              </option>
            </select>
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
              py-3 px-6 rounded-xl
              text-sm sm:text-base font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
              hover:bg-[#b8945e] active:scale-[0.98] transition-all
            "
          >
            {loading ? "Registering..." : "Submit"}
          </button>

          {/* Login Link */}
          <p className="text-[15px] sm:text-[16px] md:text-[17px] py-2 sm:py-3 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#c5a572] underline hover:text-[#d4b88a] transition-colors"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
