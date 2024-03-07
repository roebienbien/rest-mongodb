import connectToDb from './utils/connect-to-db';
import http from 'http';
import config from './config/config';
import router from './routes';
import express from 'express';
import logger from './config/logger';
import cors from 'cors';

const app = express();

connectToDb();

// essentials
app.use(cors({ origin: config.origin }));
app.use(express.json()); //very important: need for post

app.use(router);

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
  logger.info(`Server running on port : ${config.server.port}`);
});
