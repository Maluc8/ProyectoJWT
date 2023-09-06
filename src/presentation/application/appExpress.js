import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import csurf from 'csurf';

import cartRouter from '../../presentation/routes/cartsRouter.js';
import productRouter from '../../presentation/routes/productsRouter.js';
import sessionRouter from '../../presentation/routes/sessionRouter.js';
import userRouter from '../../presentation/routes/userRouter.js';
import roleRouter from '../../presentation/routes/roleRouter.js';
import errorHandler from '../../middlewares/errorHandler.js';
import config from '../../config/index.js';
import { addLogger } from '../../utils/logger.js';
import paymentRouter from '../../presentation/routes/paymentRouter.js';
import emailRouter from '../routes/emailRouter.js';

class AppExpress {
  init() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(csurf({ cookie: true }));
    this.app.use((req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });
  }
  build() {
    this.app.use(addLogger);
    this.app.use('/api/sessions', sessionRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/roles', roleRouter);
    this.app.use('/api/products', productRouter);
    this.app.use('/api/carts', cartRouter);
    this.app.use('/api/payment', paymentRouter);
    this.app.use('/api/email', emailRouter);
    this.app.use(errorHandler);
  }
  listen() {
    return this.app.listen(config.port, () => {
      console.log('Server is listening on port ', config.port, '...');
    });
  }
}

export default AppExpress;
