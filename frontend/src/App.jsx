import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import ChapterDetails from "./pages/ChapterDetails";
import ShlokaDetails from "./pages/ShlokaDetails";
import Ai from "./pages/Ai"; // ✅ make sure this exists
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      {/* 🌿 Public Routes */}
      <Route path="/" element={<PublicRoute><Intro /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/about" element={<About />} />

      {/* 🔒 Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/ai" element={<ProtectedRoute><Ai /></ProtectedRoute>} />
      <Route path="/chapters" element={<ProtectedRoute><Chapters /></ProtectedRoute>} />
      <Route path="/chapter/:id" element={<ProtectedRoute><ChapterDetails /></ProtectedRoute>} />
      <Route path="/chapter/:chapterId/shlokas/:verseId" element={<ProtectedRoute><ShlokaDetails /></ProtectedRoute>} />

      {/* 🚪 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
