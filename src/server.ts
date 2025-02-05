import Redis from "ioredis";
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT || !process.env.REDIS_PASSWORD) {
  throw new Error('Missing required environment variables for Redis configuration');
}

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => logger.info("Connected to Redis"));
redisClient.on("error", (err) => logger.error("Redis error:", err));
redisClient.on("end", () => logger.info("Redis connection closed"));

export default redisClient;