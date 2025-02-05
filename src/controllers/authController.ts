import { Request, Response, NextFunction } from 'express';
import { registerUser as registerUserService, loginUser as loginUserService } from '../services/authService';
import logger from '../utils/logger';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const result = await registerUserService(username, password);
    logger.info(`User registered: ${username}`);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Registration error for ${username}: ${error instanceof Error ? error.message : error}`);
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const result = await loginUserService(username, password);
    logger.info(`User logged in: ${username}`);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Login error for ${username}: ${error instanceof Error ? error.message : error}`);
    next(error);
  }
};