// src/index.ts
import dotenv from "dotenv"; // ✅ Load env first
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes"; // ✅ NEW: Protected route
import logger from "./utils/logger"; // ✅ NEW: Replace console with logger

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth_demo";

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ Protected route

// DB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    logger.info("✅ Connected to MongoDB");
    app.listen(PORT, () => logger.info(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    logger.error("❌ MongoDB connection error: " + err);
  });
