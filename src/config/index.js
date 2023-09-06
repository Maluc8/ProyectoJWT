import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  DB: process.env.DB,
  dbUri: process.env.DB_URI,
  privateKey: process.env.PRIVATE_KEY,
  mailKey: process.env.MAILKEY,
  stripeSecretKey: process.env.STRIPE_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUserName: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpSecure: process.env.SMTP_SECURE_SSL,
  smtpSenderName: process.env.SMTP_SENDER_NAME,
  smtpSenderEmailDefault: process.env.SMTP_SENDER_EMAIL_DEFAULT,
  URL: process.env.URL
};

export default config;
