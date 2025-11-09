import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 🧩 Import routes
import authRoutes from "./routes/authRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import shlokRoutes from "./routes/shlokRoutes.js";


// ⚙️ Config
dotenv.config();
const app = express();

// 🛡️ Middleware
app.use(cors());
app.use(express.json());
import krishnaRoutes from "./routes/krishnaRoutes.js";

// 🧭 API Routes
app.use("/api/auth", authRoutes);         // Authentication (Signup / Login)
app.use("/api/chapters", chapterRoutes);  // Chapters list / details
app.use("/api/shlok", shlokRoutes);       // Shloka details per chapter


app.use("/api/krishna", krishnaRoutes);
    // User progress tracking

// 🩵 Root test route
app.get("/", (_req, res) => {
  res.send("✨ API is running successfully...");
});

export default app;
