import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  dbUri: process.env.MONGO_DB_URI,
  privateKey: process.env.PRIVATE_KEY,
  mailKey: process.env.MAILKEY,
};

export default config;
