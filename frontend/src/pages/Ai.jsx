import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Ai = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    // 🧠 Load saved chat history from localStorage
    const saved = localStorage.getItem("krishnaChat");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🪶 Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("krishnaChat", JSON.stringify(messages));
  }, [messages]);

  const handleAskKrishna = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("https://vibeathon-zeta.vercel.app/api/krishna/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const krishnaMessage = {
        role: "krishna",
        text:
          data.response ||
          "My dear seeker, silence too carries wisdom. Try asking again.",
        reference: data.reference || "—",
      };
      setMessages((prev) => [...prev, krishnaMessage]);
    } catch (err) {
      console.error("❌ Error talking to Krishna:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "krishna",
          text: "The divine connection seems faint, Arjuna. Try again after a moment of calm.",
          reference: "—",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col bg-linear-to-b from-black via-[#0b0b0b] to-[#1a1308] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-english)" }}
    >
      {/* ✨ Navbar */}
      <Navbar />

      {/* 🌿 Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-[#c2995a33] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c2995a22] rounded-full blur-3xl"></div>
      </div>

      {/* 🕉️ Chat Section */}
      <main className="relative z-10 flex flex-col items-center mt-28 px-6 pb-16 w-full">
        <motion.h1
          className="text-3xl md:text-4xl text-[#c2995a] font-semibold mb-4 text-center drop-shadow-[0_0_8px_rgba(194,153,90,0.6)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ask Lord Krishna
        </motion.h1>

        <p className="text-gray-300 mb-8 text-center max-w-xl">
          Seek divine wisdom, guidance, and answers inspired by the Bhagavad
          Gita. Krishna speaks with compassion and clarity — just as he guided
          Arjuna.
        </p>

        {/* 💬 Chat Box */}
        <div className="w-full max-w-3xl bg-black/50 backdrop-blur-md border border-[#c2995a33] rounded-2xl p-6 shadow-lg overflow-y-auto h-[65vh] scrollbar-thin scrollbar-thumb-[#c2995a55]">
          {messages.length === 0 && (
            <p className="text-center text-gray-400 italic mt-20">
              🕉️ “Ask, and you shall receive wisdom, my child.”
            </p>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`my-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              {msg.role === "user" ? (
                <div className="inline-block bg-[#c2995a22] text-[#f9f6f0] px-4 py-2 rounded-lg shadow-md border border-[#c2995a55]">
                  <span className="font-semibold">You:</span> {msg.text}
                </div>
              ) : (
                <div className="inline-block bg-[#c2995a11] border border-[#c2995a33] text-[#c9b27c] px-4 py-3 rounded-lg shadow-md max-w-[85%]">
                  <span className="font-semibold text-[#c2995a]">Krishna:</span>{" "}
                  {msg.text}
                  {msg.reference && msg.reference !== "—" && (
                    <p className="text-xs text-gray-400 mt-1">
                      📖 Reference: {msg.reference}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {/* ✨ Krishna “thinking” animation */}
          {loading && (
            <motion.div
              className="text-center italic text-gray-400 mt-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <span>🕉️ Krishna is contemplating your question...</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ✍️ Input Box */}
        <form
          onSubmit={handleAskKrishna}
          className="flex w-full max-w-3xl mt-6 bg-[#111]/80 border border-[#c2995a33] rounded-lg overflow-hidden"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about karma, dharma, or any verse (e.g., Explain 2.47)..."
            className="grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) handleAskKrishna(e);
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#c2995a] text-black px-6 font-semibold hover:bg-[#d6aa61] transition-all disabled:opacity-50"
          >
            Ask
          </button>
        </form>
      </main>
    </div>
  );
};

export default Ai;
