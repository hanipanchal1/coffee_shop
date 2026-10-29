import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../utils/toast";

// ─────────────────────────────────────────────────────────────
//  Register Page  –  Fully Responsive (Mobile → Tablet → Desktop)
//  Desktop design remains identical to original
// ─────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:1000/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast.success(res.data.msg || "Registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
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
    relative w-full min-h-[calc(100vh-70px)]   /* ← changed */
    bg-[url('../src/assets/img/menu/bgmenuimg.png')]
    bg-center bg-cover bg-no-repeat
    text-white
    flex flex-col justify-center items-center
    px-4 sm:px-6 md:px-8
    py-10 sm:py-12
      "
    >
      {/* Subtle overlay for better text readability on all devices */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none flex flex-col items-center gap-5 sm:gap-6">
        {/* Title */}
        <p className="text-2xl sm:text-3xl md:text-3xl font-serif tracking-wide text-center">
          Register!
        </p>

        <form
          onSubmit={handleRegister}
          className="
            w-full
            flex flex-col gap-4 sm:gap-5
            justify-center items-center
          "
        >
          {/* Full Name */}
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
            type="text"
            placeholder="Full Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          {/* Email */}
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

          {/* Password */}
          <input
            className="
              w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw]
              text-base sm:text-[17px] md:text-[18px]
              border-b border-[#929292]
              py-2.5 sm:py-2
              px-4 sm:px-5
              bg-transparent outline-none
              placeholder:text-white/70 transition-colors
            "
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          {/* Role Selector */}
          <select
            className="
              w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:w-[30vw]
              text-[15px] sm:text-[16px]
              border-b
              py-2.5 sm:py-2
              px-4 sm:px-5
              bg-transparent outline-none
              text-white
              focus:border-[#c5a572] transition-colors
              appearance-none
              cursor-pointer
            "
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user" className="text-black bg-white">
              User
            </option>
            <option value="admin" className="text-black bg-white">
              Admin
            </option>
          </select>

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