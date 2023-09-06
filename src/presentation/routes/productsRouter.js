import express, { Router } from 'express';
import authorization from '../../middlewares/authorization.js';
import {
  list,
  deleteOne,
  getOne,
  save,
  update
} from '../controllers/productsController.js';

const productRouter = Router();
productRouter.use(express.json());

productRouter.get('/', list); // Probado
productRouter.get('/:id', getOne); // Probado
productRouter.post('/', authorization('saveProduct'), save);
productRouter.put('/', authorization('updateProduct'), update);
productRouter.delete('/', authorization('deleteOneProduct'), deleteOne);

export default productRouter;
