import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { InvalidCredentialsError, UsernameExistsError } from '../utils/errors';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  if (err instanceof UsernameExistsError) {
    return res.status(409).json({ error: err.message });
  }
  if (err instanceof InvalidCredentialsError) {
    return res.status(401).json({ error: err.message });
  }
  console.error(err); // Log the error for debugging
  res.status(500).json({ error: 'Internal server error.' });
  next(); // Pass control to the next middleware (if any)
};

export default errorHandler;