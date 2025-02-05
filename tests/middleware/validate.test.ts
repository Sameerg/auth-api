import { validateRegistration, validateLogin } from '../../src/middleware/validate';
import { Request, Response, NextFunction } from 'express';

describe('Validation Middleware', () => {
  describe('validateRegistration', () => {
    it('should call next if validation passes', () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      validateRegistration(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', () => {
      const req = { body: { username: 'test', password: 'pass' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      validateRegistration(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
    });
  });

  describe('validateLogin', () => {
    it('should call next if validation passes', () => {
      const req = { body: { username: 'testuser', password: 'Password1!' } } as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      validateLogin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', () => {
      const req = { body: { username: '', password: '' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as NextFunction;

      validateLogin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
    });
  });
});
