import nodemailer from 'nodemailer';
import config from '../config';

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'maluc8@gmail.com',
    pass: config.mailKey,
  },
});
export default transport;
