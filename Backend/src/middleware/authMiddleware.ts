// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { STATUS_CODES, MESSAGES } from "../utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

interface JwtPayload {
  id: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  if (!token) {
    logger.warn("Access denied: No token provided");
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.NO_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded;
    logger.info(`Token verified for user ID: ${decoded.id}`);
    next();
  } catch (err) {
    logger.error(`Invalid or expired token: ${(err as Error).message}`);
    res.status(STATUS_CODES.FORBIDDEN).json({ message: MESSAGES.INVALID_TOKEN });
  }
};
