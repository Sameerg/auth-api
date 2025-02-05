import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { PASSWORD_MIN_LENGTH } from '../config';

export const registrationSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long."),
  password: z.string().regex(
    new RegExp(`^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{${PASSWORD_MIN_LENGTH},}$`),
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters long and include one uppercase letter, one number, and one special character.`
  ),
});

const loginSchema = z.object({
  username: z.string().nonempty('Username is required.'),
  password: z.string().nonempty('Password is required.'),
});

// Middleware for registration validation
export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const result = registrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors });
    return;
  }
  next();
};

// Middleware for login validation
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
     res.status(400).json({ errors: result.error.errors });
     return;
  }
  next();
};