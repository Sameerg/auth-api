import redisClient from "../server";

// Get user by username
export const getUserByUsername = async (username: string) => {
    const user = await redisClient.hgetall(`user:${username}`);
    return Object.keys(user).length > 0 ? user : null;
  };
  
  // Create user
  export const createUser = async (username: string, password: string) => {
    await redisClient.hset(`user:${username}`, "password", password);
  };
  
  // Get user (same as `getUserByUsername`, but kept for clarity)
  export const getUser = async (username: string) => {
    const user = await redisClient.hgetall(`user:${username}`);
    return Object.keys(user).length > 0 ? user : null;
  };
  