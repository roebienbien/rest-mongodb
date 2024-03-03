import pino from 'pino';

const logger = pino({
  // name: __filename,
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
