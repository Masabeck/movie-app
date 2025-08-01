// src/index.ts
import dotenv from "dotenv"; // ✅ Load env first
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tmdbRoutes from './routes/tmdb';
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes"; // ✅ Protected route
import logger from "./utils/logger"; // ✅ Logging with Winston
import favoriteRoutes from './routes/favoriteRoutes';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ❌ Fail fast if MONGO_URI is missing
if (!MONGO_URI) {
  logger.error("❌ MONGO_URI is not defined in environment variables. Exiting...");
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tmdb', tmdbRoutes); // ✅ Register TMDB route
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ Protected route
app.use('/api/favorites', favoriteRoutes); // ✅ Favorites route

// DB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    logger.info("✅ Connected to MongoDB");
    app.listen(PORT, () => logger.info(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    logger.error("❌ MongoDB connection error: " + err);
    process.exit(1); // 🔴 Exit if DB fails to connect
  });
