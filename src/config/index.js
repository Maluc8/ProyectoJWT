import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  DB: process.env.DB,
  dbUri: process.env.DB_URI,
  privateKey: process.env.PRIVATE_KEY,
  mailKey: process.env.MAILKEY,
};

export default config;
