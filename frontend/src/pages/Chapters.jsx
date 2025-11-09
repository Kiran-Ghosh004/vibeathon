import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // ✅ Navbar added at the top

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch("https://vedicscriptures.github.io/chapters");
        const data = await res.json();
        setChapters(data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  const handleChapterClick = (chapter) => {
    // navigate to next route for full details later
    navigate(`/chapter/${chapter.chapter_number}`, { state: { chapter } });
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-black via-[#0a0a0a] to-black text-white overflow-hidden">
      {/* 🌟 Navbar */}
      <Navbar />

      {/* 🌿 Page Header */}
      <div className="text-center pt-28 pb-10 px-6">
        <motion.h1
          className="sanskrit-text text-3xl sm:text-4xl md:text-5xl font-semibold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            color: "#f9f6f0",
            textShadow:
              "0 0 25px rgba(194,153,90,0.8), 0 0 40px rgba(194,153,90,0.3)",
          }}
        >
          श्रीमद्भगवद्गीता अध्यायाः
        </motion.h1>
        <motion.p
          className="english-text text-base sm:text-lg text-gray-300 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.3 }}
        >
          Explore all 18 Chapters of the{" "}
          <span className="text-var(--color-gold) font-semibold">
            Divine Gita
          </span>
        </motion.p>
      </div>

      {/* 🌺 Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64 text-var(--color-gold) text-lg font-[Outfit]">
          Loading chapters...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.chapter_number}
              onClick={() => handleChapterClick(chapter)}
              className="cursor-pointer bg-[#0e0e0e]/80 border border-[#c2995a]/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_20px_rgba(194,153,90,0.15)] hover:shadow-[0_0_35px_rgba(194,153,90,0.4)] hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              {/* Sanskrit Chapter Name */}
              <h2
                className="sanskrit-text text-2xl font-semibold mb-2"
                style={{
                  color: "#f9f6f0",
                  textShadow: "0 0 10px rgba(194,153,90,0.4)",
                }}
              >
                {chapter.name}
              </h2>

              {/* English Translation */}
              {chapter.translation && (
                <p className="english-text text-lg font-[Outfit] text-var(--color-gold) mb-1">
                  {chapter.translation}
                </p>
              )}

              {/* Transliteration */}
              {chapter.transliteration && (
                <p className="english-text text-sm text-gray-400 italic mb-3">
                  {chapter.transliteration}
                </p>
              )}

              {/* Details */}
              <div className="text-sm text-gray-300 font-[Outfit] space-y-1">
                <p>📖 Chapter {chapter.chapter_number}</p>
                <p>🕉️ Verses: {chapter.verses_count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✨ Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#c89d5c33] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Chapters;
