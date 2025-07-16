// src/routes/authRoutes.ts

import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";
import { STATUS_CODES, MESSAGES } from "../utils/constants";
import logger from "../utils/logger";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// ✅ Protected route (like dashboard)
router.get("/dashboard", authenticateToken, (req, res) => {
  logger.info("Accessed dashboard route");
  res.status(STATUS_CODES.OK).json({
    message: MESSAGES.DASHBOARD_SUCCESS,
    user: (req as any).user,
  });
});

export default router;
