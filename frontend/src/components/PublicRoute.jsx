import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // ✅ Valid token → redirect to AI or Home
      if (decoded.exp > currentTime) {
        return <Navigate to="/ai" replace />;
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  // ✅ No valid token → show the page
  return children;
};

export default PublicRoute;