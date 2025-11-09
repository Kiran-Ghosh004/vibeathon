import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import chapters from "../assets/chapters.jpg";

const ChapterDetails = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await fetch(`https://vedicscriptures.github.io/chapter/${id}/`);
        const data = await res.json();
        setChapter(data);
      } catch (err) {
        console.error("Error fetching chapter details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c2995a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#c2995a] text-xl font-medium">Loading Sacred Wisdom...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Chapter not found.</p>
          <button
            onClick={() => navigate("/chapters")}
            className="px-6 py-2 bg-[#c2995a] text-white rounded-lg hover:bg-[#d4a962] transition-colors"
          >
            Return to Chapters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `url(${chapters})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black/95"></div>

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-[#c2995a]/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#c2995a]/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Chapter Number Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="px-6 py-2 bg-gradient-to-r from-[#c2995a]/20 to-[#c2995a]/10 border border-[#c2995a]/40 rounded-full backdrop-blur-sm">
              <span className="text-[#c2995a] font-semibold text-sm tracking-wider">
                CHAPTER {chapter.chapter_number} • {chapter.verses_count} VERSES
              </span>
            </div>
          </motion.div>

          {/* Sanskrit Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              background: "linear-gradient(135deg, #f9f6f0 0%, #c2995a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(194,153,90,0.3)",
            }}
          >
            {chapter.name}
          </motion.h1>

          {/* English Translation */}
          <motion.h2
            className="text-2xl md:text-3xl text-[#c2995a] font-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {chapter.translation}
          </motion.h2>

          {/* Transliteration */}
          <motion.p
            className="text-lg text-gray-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {chapter.transliteration}
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c2995a]"></div>
            <div className="w-3 h-3 rotate-45 bg-[#c2995a] shadow-[0_0_20px_rgba(194,153,90,0.6)]"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c2995a]"></div>
          </motion.div>
        </motion.div>

        {/* Content Stack - Vertical Layout */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {/* Meaning Card */}
          <motion.div
            className="group relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-xl border border-[#c2995a]/30 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_40px_rgba(194,153,90,0.2)] transition-all duration-500 hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c2995a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c2995a]/20 flex items-center justify-center">
                  <span className="text-[#c2995a] text-xl">✨</span>
                </div>
                <h3 className="text-[#c2995a] text-xl font-semibold tracking-wide">Meaning</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-[#c2995a]/40">
                  <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">English</p>
                  <p className="text-gray-100 text-base leading-relaxed">
                    {chapter.meaning?.en}
                  </p>
                </div>
                
                <div className="pl-4 border-l-2 border-[#c2995a]/40">
                  <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">हिन्दी</p>
                  <p className="text-gray-200 text-base leading-relaxed">
                    {chapter.meaning?.hi}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            className="group relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-xl border border-[#c2995a]/30 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_40px_rgba(194,153,90,0.2)] transition-all duration-500 hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c2995a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c2995a]/20 flex items-center justify-center">
                  <span className="text-[#c2995a] text-xl">📜</span>
                </div>
                <h3 className="text-[#c2995a] text-xl font-semibold tracking-wide">Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-[#c2995a]/40">
                  <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">English</p>
                  <p className="text-gray-100 text-base leading-relaxed whitespace-pre-line">
                    {chapter.summary?.en}
                  </p>
                </div>
                
                <div className="pl-4 border-l-2 border-[#c2995a]/40">
                  <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">हिन्दी</p>
                  <p className="text-gray-200 text-base leading-relaxed whitespace-pre-line">
                    {chapter.summary?.hi}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => navigate(`/chapter/${id}/shlokas/1`)}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#c2995a] to-[#d4a962] text-white text-lg font-semibold rounded-full shadow-[0_8px_30px_rgba(194,153,90,0.4)] hover:shadow-[0_12px_40px_rgba(194,153,90,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Button Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative z-10">Explore Sacred Verses</span>
            <svg
              className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#c2995a]/10 via-[#c2995a]/5 to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default ChapterDetails;