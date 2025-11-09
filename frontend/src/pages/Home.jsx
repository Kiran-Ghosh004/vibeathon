import React from "react";
import introBg from "../assets/intro.jpg"; // ✅ Ensure correct file type
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // ✅ Import your reusable Navbar

const Home = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${introBg})`,
      }}
    >
      {/* ✨ Soft golden overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/80"></div>

      {/* 🪶 Navbar (fixed at top) */}
      <Navbar />

      {/* 🌿 Content */}
      <div className="relative z-10 max-w-4xl px-6 py-10 text-white space-y-10">
        {/* Sanskrit Heading */}
        <motion.h1
          className="sanskrit-text text-5xl md:text-6xl font-semibold leading-snug tracking-wide mt-20"
          initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            color: "#f9f6f0",
            textShadow:
              "0 0 25px rgba(194,153,90,0.9), 0 0 40px rgba(194,153,90,0.4), 0 0 60px rgba(194,153,90,0.2)",
          }}
        >
          दिव्यश्लोक - गीता ज्ञानस्य पथः
        </motion.h1>

        {/* English Heading */}
        <motion.h2
          className="english-text text-lg md:text-2xl italic max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
          style={{
            color: "#f5f5f5",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
          }}
        >
          Welcome to{" "}
          <span
            style={{
              color: "var(--color-gold)",
              fontWeight: "700",
              fontFamily: "var(--font-ui)",
            }}
          >
            DivineVerse
          </span>{" "}
          - where timeless verses meet intelligent understanding.
        </motion.h2>

        {/* 🌸 Description Section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#c2995a]/30 p-8 max-w-3xl mx-auto text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        >
          <p
            className="english-text text-base md:text-lg text-gray-200 leading-relaxed"
            style={{ fontFamily: "var(--font-english)" }}
          >
            <span className="text-(--color-gold) font-semibold">
              DivineVerse
            </span>{" "}
            is an AI-powered platform dedicated to unraveling the wisdom of the{" "}
            <strong>Bhagavad Gita</strong> — a guide to understanding life,
            purpose, and consciousness. Here, every verse is not only translated
            but <em>interpreted intelligently</em> through AI assistance,
            making spirituality accessible for everyone.
            <br />
            <br />
            Experience the Gita like never before — with smooth explanations,
            contextual meaning, and a divine sense of calm through sound, design
            and clarity.
          </p>
        </motion.div>

        {/* ✨ Subtext */}
        <motion.p
          className="english-text text-sm md:text-base max-w-xl mx-auto mt-8 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          style={{
            fontFamily: "var(--font-ui)",
            color: "#e0e0e0",
          }}
        >
          “The purpose of DivineVerse is not to preach, but to connect — merging
          the eternal truth of Krishna’s words with the intelligence of modern
          AI.”
        </motion.p>
      </div>

      {/* 🌕 Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#c89d5c33] to-transparent blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default Home;
