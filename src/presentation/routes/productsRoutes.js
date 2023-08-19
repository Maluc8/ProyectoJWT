import express, { Router } from 'express';
import {
  list,
  deleteOne,
  getOne,
  save,
  update,
} from '../controllers/productsController.js';

const productRouter = Router();
productRouter.use(express.json());

productRouter.get('/', list);
productRouter.get('/:id', getOne);
productRouter.post('/', save);
productRouter.put('/', update);
productRouter.delete('/', deleteOne);
// productRouter.get('/api/realTimeProducts', list);

export default productRouter;
