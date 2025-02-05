# Lendesk Project

## Overview

This project is a Node.js application that provides authentication services using Redis for user data storage. It includes user registration and login functionalities, with proper validation and error handling.

## Features

- User registration with password hashing
- User login with JWT token generation
- Input validation using Zod
- Error handling and logging
- Rate limiting to prevent abuse
- Secure headers with Helmet
- Cross-Origin Resource Sharing (CORS) support

## Setup

### Prerequisites

- Node.js (>= 14.x)
- Docker
- Environment variables setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sameerg/auth-api.git
   cd auth-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=testPass
   LOG_SERVER_URL=your_log_server_url
   NODE_ENV=development
   ```

### Running the Application

1. Start the Redis server using Docker:
   ```bash
   docker run --name my-redis -d -p 6379:6379 redis --requirepass testPass
   ```

2. Run the application:
   ```bash
   npm start
   ```

3. The server will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user

### Health Check

- `GET /health` - Check the health status of the server

## Sample Curl Requests

### Register a User
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test@1234"
  }'
```

### Login a User
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test@1234"
  }'
```

## Logging

The application uses Winston for logging. Logs are written to the console, files, and an HTTP endpoint if configured.

## Error Handling

Errors are handled centrally and appropriate HTTP status codes are returned.

## Future Scope

To make this API better, consider the following enhancements:

1. **Password Reset Functionality**: Add endpoints for password reset, including email verification.
2. **API Documentation**: Use tools like Swagger to generate interactive API documentation.
3. **Database Support**: Add support for other databases like MongoDB or PostgreSQL for more robust data storage.
4. **Dockerization**: Create Docker images for the application to simplify deployment.
5. **CI/CD Pipeline**: Set up a continuous integration and continuous deployment pipeline to automate testing and deployment.
