import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
  prettyPrint: true,
  base: null,
  timestamp: () => `,"time": "${dayjs().format()}"`,
});

export default log;
