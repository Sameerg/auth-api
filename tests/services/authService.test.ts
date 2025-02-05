import { registerUser, loginUser } from '../../src/services/authService';
import * as userModel from '../../src/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  describe('registerUser', () => {
    it('should throw an error if username already exists', async () => {
      (userModel.getUserByUsername as jest.Mock).mockResolvedValue({ username: 'test' });
      await expect(registerUser('test', 'password')).rejects.toThrow('Username already exists.');
    });

    it('should create a new user if username does not exist', async () => {
      (userModel.getUserByUsername as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (userModel.createUser as jest.Mock).mockResolvedValue({ username: 'test', password: 'hashedPassword' });

      const result = await registerUser('test', 'password');
      expect(result).toEqual({ message: 'User created successfully.' });
    });
  });

  describe('loginUser', () => {
    it('should throw an error if username or password is invalid', async () => {
      (userModel.getUserByUsername as jest.Mock).mockResolvedValue(null);
      await expect(loginUser('test', 'password')).rejects.toThrow('Invalid username or password.');
    });

    it('should return a token if username and password are valid', async () => {
      (userModel.getUserByUsername as jest.Mock).mockResolvedValue({ username: 'test', password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await loginUser('test', 'password');
      expect(result).toEqual({ message: 'Authentication successful.', token: 'token' });
    });
  });
});
