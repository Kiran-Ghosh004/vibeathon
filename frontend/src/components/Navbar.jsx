import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import logo from "../assets/logo.jpg"; // ✅ Import logo

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await axios.post("https://vibeathon-zeta.vercel.app/api/auth/logout");
    } catch (err) {
      console.warn("Logout API error:", err.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  };

  const navItems = [
    { name: "About", icon: <AiOutlineInfoCircle />, link: "/about" },
    { name: "Chapters", icon: <FaBookOpen />, link: "/chapters" },
    { name: "AI", icon: <GiArtificialIntelligence />, link: "/ai" },
    { name: "Logout", icon: <AiOutlineLogout />, action: handleLogout },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const timeoutId = setTimeout(() => closeBtnRef.current?.focus(), 100);
      return () => clearTimeout(timeoutId);
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-[#c2995a]/30 shadow-[0_4px_15px_rgba(194,153,90,0.15)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-6 py-3 md:py-4">
          {/* ✅ Logo / Brand */}
          <NavLink to="/home" className="flex items-center gap-3">
            <img
              src={logo}
              alt="DivineVerse Logo"
              className="w-10 h-10 rounded-full border-2 border-[#c2995a] shadow-[0_0_10px_rgba(194,153,90,0.5)] hover:scale-105 transition-transform duration-200"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="flex items-center gap-2 text-base text-white hover:text-[#c2995a] transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-base transition-colors duration-200 ${
                      isActive
                        ? "text-[#c2995a]"
                        : "text-white hover:text-[#c2995a]"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white text-2xl p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#c2995a]/50 transition-colors"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex justify-end"
            onClick={handleOverlayClick}
            ref={overlayRef}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-72 max-w-[80vw] h-full border-l border-[#c2995a]/40 shadow-[0_0_28px_rgba(194,153,90,0.35)] p-6 flex flex-col overflow-y-auto bg-linear-to-b from-[#101010] via-[#0a0a0a] to-[#000000]"
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ Logo in Drawer */}
              <div className="flex items-center justify-between mb-8">
                <NavLink
                  to="/home"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={logo}
                    alt="DivineVerse Logo"
                    className="w-10 h-10 rounded-full border-2 border-[#c2995a] shadow-[0_0_10px_rgba(194,153,90,0.5)] hover:scale-105 transition-transform duration-200"
                  />
                </NavLink>

                <button
                  ref={closeBtnRef}
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-2xl p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#c2995a]/50"
                >
                  <AiOutlineClose />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item) =>
                  item.action ? (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.action();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-base text-white hover:text-[#c2995a] hover:bg-white/5 transition-all duration-200"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 ${
                          isActive
                            ? "text-[#c2995a] bg-[#c2995a]/10"
                            : "text-white hover:text-[#c2995a] hover:bg-white/5"
                        }`
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  )
                )}
              </nav>

              <div className="mt-auto pt-6 text-center text-sm text-gray-500">
                © DivineVerse 2025
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
