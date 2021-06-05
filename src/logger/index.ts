import pino from 'pino';
import dayjs from 'dayjs';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
  base: null,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
