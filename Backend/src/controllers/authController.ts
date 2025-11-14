// src/controllers/authController.ts

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import logger from "../utils/logger";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      logger.warn(`Register failed: ${email} already exists`);
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    logger.info(`User registered: ${email}`);
    res.status(STATUS_CODES.CREATED).json({ token });
  } catch (err) {
    logger.error(`Register error: ${err}`);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.REGISTRATION_FAILED });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`Login failed: ${email} not found`);
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Login failed: password mismatch for ${email}`);
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    logger.info(`User logged in: ${email}`);
    res.status(STATUS_CODES.OK).json({ token });
  } catch (err) {
    logger.error(`Login error: ${err}`);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.LOGIN_FAILED });
  }
};
