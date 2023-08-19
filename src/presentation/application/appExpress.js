import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import cartRouter from '../../presentation/routes/cartsRoutes.js';
import productRouter from '../../presentation/routes/productsRoutes.js';
import sessionRouter from '../../presentation/routes/sessionRoutes.js';
import userRouter from '../../presentation/routes/userRoutes.js';
import roleRouter from '../../presentation/routes/roleRoutes.js';
import errorHandler from '../../middlewares/errorHandler.js';
import config from '../../config/index.js';
import { addLogger } from '../../utils/logger.js';

class AppExpress {
  init() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
  build() {
    this.app.use(addLogger);
    this.app.use('/api/sessions', sessionRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/roles', roleRouter);
    this.app.use(
      '/api/products',
      (req, res, next) => {
        console.log('appExpress');
        next();
      },
      productRouter
    );
    this.app.use('/api/carts', cartRouter);
    this.app.use(errorHandler);
  }
  listen() {
    return this.app.listen(config.port, () => {
      console.log('Server is listening on port ', config.port, '...');
    });
  }
}

export default AppExpress;
