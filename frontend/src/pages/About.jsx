import React from "react";
import aboutbg from "../assets/about.jpeg";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // ✅ import your navbar

const About = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center overflow-hidden text-white"
      style={{
        backgroundImage: `url(${aboutbg})`,
        backgroundColor: "#0b0b0b",
      }}
    >
      {/* ✨ Deep Golden Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/90" />

      {/* 🧭 Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 🪶 Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center grow px-4 sm:px-6 lg:px-8 py-20">
        {/* Title */}
        <motion.h1
          className="sanskrit-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-center"
          initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            color: "#f9f6f0",
            textShadow:
              "0 0 18px rgba(194,153,90,0.8), 0 0 32px rgba(194,153,90,0.35)",
          }}
        >
          दिव्यश्लोक
        </motion.h1>

        {/* English Subheading */}
        <motion.h2
          className="english-text text-base sm:text-lg md:text-xl font-semibold mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            color: "#c2995a",
            textShadow: "0 0 10px rgba(194,153,90,0.28)",
          }}
        >
          About Divine Verse
        </motion.h2>

        {/* About Card */}
        <motion.div
          className="mt-6 bg-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border border-[#c2995a]/30 max-w-3xl w-full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <p className="english-text text-sm sm:text-base text-gray-300 leading-relaxed font-[Merriweather] text-center">
            <span className="text-[#c2995a] font-semibold">DivineVerse</span>{" "}
            is an AI-powered eBook that reimagines the{" "}
            <strong>Bhagavad Gita</strong> for the modern era — blending sacred
            knowledge with artificial intelligence to help readers gain deep
            insights. It includes <em>speech-to-text</em> and accessibility
            features so seekers of all abilities can embrace its wisdom.
          </p>
        </motion.div>

        {/* Creators Section */}
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch place-items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="w-full max-w-xs bg-black/55 backdrop-blur-md p-4 rounded-xl border border-[#c2995a]/30 shadow-md text-center">
            <h4 className="english-text text-lg sm:text-xl font-semibold text-white">
              Kiran Ghosh
            </h4>
            <p className="text-[#c2995a] text-sm font-[Outfit] mt-1">
              Frontend Developer & AI Integration
            </p>
          </div>

          <div className="w-full max-w-xs bg-black/55 backdrop-blur-md p-4 rounded-xl border border-[#c2995a]/30 shadow-md text-center">
            <h4 className="english-text text-lg sm:text-xl font-semibold text-white">
              Jaydeep Mukherjee
            </h4>
            <p className="text-[#c2995a] text-sm font-[Outfit] mt-1">
              Backend Developer
            </p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          className="english-text italic text-gray-400 text-sm sm:text-base mt-8 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ textShadow: "0 0 12px rgba(194,153,90,0.12)" }}
        >
          “This isn’t just an AI project — it’s a journey uniting ancient wisdom
          with modern intelligence.”
        </motion.p>
      </div>

      {/* ✨ Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-linear-to-t from-[#c89d5c33] to-transparent pointer-events-none" />
    </div>
  );
};

export default About;
