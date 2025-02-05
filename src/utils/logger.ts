import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new transports.Http({
      host: process.env.LOG_SERVER_URL,
      path: '/logs',
      ssl: true,
    }),
  ],
});

export default logger;
