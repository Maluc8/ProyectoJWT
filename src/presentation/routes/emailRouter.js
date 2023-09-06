import { Router } from 'express';
import { sendEmail, recoveryPage, updatePass } from '../controllers/emailController.js';

const emailRouter = Router();

emailRouter.get('/', sendEmail);
emailRouter.get('/recovery/:token', recoveryPage);
emailRouter.put('/submit', updatePass);

export default emailRouter;
