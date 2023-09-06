import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transport = nodemailer.createTransport({
  service: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUserName,
    pass: config.smtpPassword
  }
});
export default transport;
