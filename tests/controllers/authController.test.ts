import { registerUser, loginUser } from '../../src/controllers/authController';
import * as authService from '../../src/services/authService';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/authService');

describe('AuthController', () => {
  describe('registerUser', () => {
    it('should return 201 if user is registered successfully', async () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      (authService.registerUser as jest.Mock).mockResolvedValue({ message: 'User created successfully.' });

      await registerUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully.' });
    });

    it('should call next with error if registration fails', async () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const error = new Error('Registration error');
      (authService.registerUser as jest.Mock).mockRejectedValue(error);

      await registerUser(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('loginUser', () => {
    it('should return 200 if user is logged in successfully', async () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      (authService.loginUser as jest.Mock).mockResolvedValue({ message: 'Authentication successful.', token: 'token' });

      await loginUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication successful.', token: 'token' });
    });

    it('should call next with error if login fails', async () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      const error = new Error('Login error');
      (authService.loginUser as jest.Mock).mockRejectedValue(error);

      await loginUser(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
