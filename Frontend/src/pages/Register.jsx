import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../utils/toast";

// ─────────────────────────────────────────────────────────────
//  Register Page
//
//  Backend requires: name, email, password, role
//  (phone is NOT in the backend model, so we removed it)
//
//  After successful registration → redirects to /login
// ─────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role is 'user'
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
        role, // ✅ backend requires this field
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
    <div className="bg-[url('../src/assets/img/menu/bgmenuimg.png')] w-full h-[82.7vh] bg-center bg-cover text-white flex flex-col justify-center items-center gap-5">
      <p className="text-3xl font-serif">Register!</p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <input
          className="text-[18px] border-b py-2 w-[30vw] flex px-5 border-[#929292] bg-transparent outline-none"
          type="text"
          placeholder="Full Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        {/* Role selector — so testers can register as admin if needed */}
        <select
          className="text-[16px] border-b py-2 w-[30vw] px-5 border-[#929292] bg-transparent outline-none text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user" className="text-black">
            User
          </option>
          <option value="admin" className="text-black">
            Admin
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#c5a572] w-30 flex items-center justify-center mt-5 py-3 px-6 rounded-xl disabled:opacity-60"
        >
          {loading ? "Registering..." : "Submit"}
        </button>

        <p className="text-[17px] py-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#c5a572] underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
