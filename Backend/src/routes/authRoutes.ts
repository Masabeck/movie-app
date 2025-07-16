// src/routes/authRoutes.ts

import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

import { authenticateToken } from "../middleware/authMiddleware";

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "🔒 This is protected data!", user: (req as any).user });
});
