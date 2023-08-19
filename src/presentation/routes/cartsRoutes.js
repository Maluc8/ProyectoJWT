import express, { Router } from 'express';
import {
  list,
  deleteOne,
  getOne,
  create,
  updateOne,
  closeCart,
  deleteOneProduct,
  updateQuantity,
  deleteAllproducts,
} from '../controllers/cartsController.js';

const cartRouter = Router();

cartRouter.use(express.json());

cartRouter.get('/', list);
cartRouter.get('/:id', getOne);
cartRouter.post('/', create);
cartRouter.put('/', updateOne);
cartRouter.put('/:id', closeCart);
cartRouter.put('/:cid/products/:pid', updateQuantity);
cartRouter.delete('/', deleteOne);
cartRouter.delete('/:cid/products/:pid', deleteOneProduct);
cartRouter.delete('/', deleteAllproducts);

export default cartRouter;
