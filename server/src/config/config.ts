import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.PORT;

const SERVER = {
  port: SERVER_PORT,
};

const MONGO_URI = process.env.MONGO_URI as string;

const MONGO = {
  uri: MONGO_URI,
};

const config = {
  server: SERVER,
  mongo: MONGO,
  origin: process.env.CLIENT_ORIGIN,
};

export default config;
