// src/routes/dashboardRoutes.ts
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { STATUS_CODES, MESSAGES } from "../utils/constants";
import logger from "../utils/logger";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  logger.info("Dashboard accessed by user");
  res.status(STATUS_CODES.OK).json({ message: MESSAGES.DASHBOARD_SUCCESS });
});

export default router;
