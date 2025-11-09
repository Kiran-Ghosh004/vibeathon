import React, { useEffect, useRef, useState } from "react";
import omAudio from "../assets/om.mp3";
import { motion } from "framer-motion";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(
    JSON.parse(localStorage.getItem("isMuted")) || false
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.15;
      audio.loop = true;
      audio.muted = isMuted;
    }
  }, [isMuted]);

  const startMusic = async () => {
    const audio = audioRef.current;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // autoplay blocked until interaction
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMuteState = !isMuted;
      audio.muted = newMuteState;
      setIsMuted(newMuteState);
      localStorage.setItem("isMuted", JSON.stringify(newMuteState));
    }
  };

  useEffect(() => {
    const playOnInteraction = () => {
      startMusic();
      document.removeEventListener("click", playOnInteraction);
    };
    document.addEventListener("click", playOnInteraction);
    return () => document.removeEventListener("click", playOnInteraction);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={omAudio} loop playsInline />

      {/* 🔇 Smaller, tighter, further bottom-right */}
      <motion.button
        onClick={!isPlaying ? startMusic : toggleMute}
        className={`fixed bottom-3 right-3 rounded-full w-10 h-10 flex items-center justify-center bg-[rgba(0,0,0,0.6)] border border-[#c2995a]/60 shadow-[0_0_12px_rgba(194,153,90,0.35)] hover:bg-[rgba(0,0,0,0.8)] transition-all duration-300 ${
          !isPlaying ? "animate-pulse" : ""
        }`}
        style={{ zIndex: 9999 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        title={
          !isPlaying
            ? "Click to Start Music"
            : isMuted
            ? "Unmute Sound"
            : "Mute Sound"
        }
      >
        {!isPlaying ? (
          <span className="text-xl text-gray-300">🔈</span>
        ) : isMuted ? (
          <span className="text-xl text-[#c2995a]">🔇</span>
        ) : (
          <span className="text-xl text-[#c2995a]">🔊</span>
        )}
      </motion.button>

      {/* 🪷 Smaller tooltip, closer to the corner */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-14 right-3 bg-[rgba(0,0,0,0.6)] text-white px-3 py-1.5 rounded-md text-xs cursor-pointer border border-[#c2995a]/50 shadow-md hover:bg-[rgba(0,0,0,0.8)]"
          style={{ zIndex: 9999 }}
          onClick={startMusic}
        >
          🎵 Tap to play
        </motion.div>
      )}
    </>
  );
};

export default BackgroundAudio;
