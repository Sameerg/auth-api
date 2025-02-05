export const PASSWORD_MIN_LENGTH = 8;
export const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;