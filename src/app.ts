import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import hpp from "hpp";
import logger from "./utils/logger";
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from "./config";
import redisClient from "./server";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

const app = express();

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // 15 minutes
  max: RATE_LIMIT_MAX_REQUESTS, // Limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(bodyParser.json());
app.use(limiter); // Apply rate limiting
app.use("/api", authRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// check redis connection
app.get("/health", async (_, res) => {
  try {
    await redisClient.ping();
    res.json({ service: "UP", redis: "UP" });
  } catch (error) {
    res.status(500).json({
        service: "UP",
        redis: "DOWN",
        error: error instanceof Error ? error.message : error,
      });
  }
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.message);
  errorHandler(err, req, res, next);
});

export default app;
