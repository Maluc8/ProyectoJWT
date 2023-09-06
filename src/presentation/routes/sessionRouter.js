import { Router } from 'express';

import {
  // forgetPassword,
  login,
  current,
  signup
} from '../controllers/sessionController.js';
import auth from '../../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', login); // Probado
sessionRouter.post('/current', auth, current); // Probado
sessionRouter.post('/signup', signup);

// sessionRouter.post('/logout',logout);
// sessionRouter.post('/forget-password',forgetPassword);

export default sessionRouter;
