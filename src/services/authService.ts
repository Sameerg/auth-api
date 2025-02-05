import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../models/userModel';
import logger from '../utils/logger';
import { JWT_SECRET } from '../config';
import { InvalidCredentialsError, UsernameExistsError } from '../utils/errors';

export const registerUser = async (username: string, password: string) => {
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new UsernameExistsError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, hashedPassword);
  logger.info(`User registered: ${username}`);
  return { message: 'User created successfully.' };
};

export const loginUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new InvalidCredentialsError();
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  logger.info(`User logged in: ${username}`);
  return { message: 'Authentication successful.', token };
};
