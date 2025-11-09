import React from "react";
import { Link } from "react-router-dom";
import chapters from "../assets/chapters.jpg"; // ✅ ensure correct file type (.jpg/.png)
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${chapters})`,
      }}
    >
      {/* ✨ Enhanced gradient overlay with better depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/85"></div>
      
      {/* Additional ambient glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,153,90,0.15)_0%,transparent_70%)]"></div>

      {/* 🌿 Content */}
      <div className="relative z-10 max-w-4xl px-4 sm:px-6 py-10 text-white space-y-8 sm:space-y-10">
        {/* Sanskrit Heading */}
        <motion.h1
          className="sanskrit-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-snug tracking-wide"
          initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            color: "#f9f6f0",
            textShadow:
              "0 0 30px rgba(194,153,90,0.95), 0 0 50px rgba(194,153,90,0.5), 0 0 70px rgba(194,153,90,0.25)",
          }}
        >
          दिव्यश्लोक मध्ये स्वागतम् ।
        </motion.h1>

        {/* English Heading */}
        <motion.h2
          className="english-text text-base sm:text-lg md:text-2xl italic max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
          style={{
            color: "#f5f5f5",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Welcome to{" "}
          <span
            className="font-bold"
            style={{
              color: "#c2995a",
              textShadow: "0 0 20px rgba(194,153,90,0.6)",
            }}
          >
            DivineVerse
          </span>{" "}
          — your intelligent companion through eternal wisdom.
        </motion.h2>

        {/* 🌺 Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-5 mt-6 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        >
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-[Outfit] text-base sm:text-lg font-semibold bg-[#c2995a] text-black shadow-[0_4px_25px_rgba(194,153,90,0.5)] hover:shadow-[0_6px_35px_rgba(194,153,90,0.7)] hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Login
            </button>
          </Link>

          <Link to="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-[Outfit] text-base sm:text-lg font-semibold bg-white/95 text-[#c2995a] hover:bg-white shadow-[0_4px_25px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_35px_rgba(255,255,255,0.4)] hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
          </Link>

          <Link to="/about" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-[Outfit] text-base sm:text-lg font-semibold border-2 border-[#c2995a] text-[#c2995a] hover:bg-[#c2995a] hover:text-black hover:shadow-[0_4px_25px_rgba(194,153,90,0.7)] hover:-translate-y-1 hover:scale-105 backdrop-blur-sm bg-black/20 transition-all duration-300">
              Know More
            </button>
          </Link>
        </motion.div>

        {/* ✨ Subtext */}
        <motion.p
          className="english-text text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-6 sm:mt-8 opacity-90 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          style={{
            fontFamily: "var(--font-ui)",
            color: "#e8e8e8",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          "Where ancient wisdom meets modern intelligence — discover the light
          within every verse."
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.3 }}
        >
          <div className="w-12 sm:w-16 h-px bg-linear-to-r from-transparent via-[#c2995a] to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-[#c2995a] shadow-[0_0_10px_rgba(194,153,90,0.8)]"></div>
          <div className="w-12 sm:w-16 h-px bg-linear-to-r from-transparent via-[#c2995a] to-transparent"></div>
        </motion.div>
      </div>

      {/* 🌕 Enhanced Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#c2995a]/20 via-[#c2995a]/5 to-transparent blur-3xl pointer-events-none"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-[radial-gradient(circle,rgba(194,153,90,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-[radial-gradient(circle,rgba(194,153,90,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default Intro;