import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/login.jpg";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://vibeathon-zeta.vercel.app/api/auth/login", {
        email,
        password,
      });

      // ✅ Store token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("✅ Login successful:", res.data);
      navigate("/home"); // redirect after login
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      {/* ✨ Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/35 to-black/65"></div>

      {/* 🌿 Login Form */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md w-full mx-6 border border-[#c2995a]/40">
        <h1
          className="sanskrit-text text-3xl md:text-4xl font-semibold text-white mb-3"
          style={{
            textShadow:
              "0 0 20px rgba(194,153,90,0.6), 0 0 40px rgba(194,153,90,0.3)",
          }}
        >
          दिव्यश्लोक
        </h1>

        <h2
          className="english-text text-xl font-semibold mb-6"
          style={{
            color: "#f9f6f0",
            textShadow:
              "0 0 25px rgba(194,153,90,0.9), 0 0 40px rgba(194,153,90,0.4), 0 0 60px rgba(194,153,90,0.2)",
          }}
        >
          Welcome Back to DivineVerse
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="px-4 py-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c2995a]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="px-4 py-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c2995a]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="mt-2 px-8 py-3 rounded-lg font-[Outfit] text-lg font-medium bg-[#c2995a] text-white shadow-[0_4px_20px_rgba(194,153,90,0.4)] hover:shadow-[0_6px_30px_rgba(194,153,90,0.6)] hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Login
          </motion.button>
        </form>

        <motion.div
          className="flex items-center my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grow h-px bg-white/30"></div>
          <span className="px-3 text-sm text-gray-300 font-[Outfit]">
            or continue with
          </span>
          <div className="grow h-px bg-white/30"></div>
        </motion.div>

        <motion.p
          className="mt-6 text-gray-300 text-sm font-[Outfit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#c2995a] hover:underline font-medium"
          >
            Sign Up
          </Link>
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#be945533] to-transparent blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default Login;
