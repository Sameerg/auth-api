import errorHandler from '../../src/middleware/errorHandler';
import { Request, Response, NextFunction } from 'express';
import { InvalidCredentialsError, UsernameExistsError } from '../../src/utils/errors';

describe('Error Handler Middleware', () => {
  it('should return 409 for "Username already exists." error', () => {
    const err = new UsernameExistsError();
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username already exists.' });
  });

  it('should return 401 for "Invalid username or password." error', () => {
    const err = new InvalidCredentialsError();
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password.' });
  });

  it('should return 500 for other errors', () => {
    const err = new Error('Some other error');
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });
});
