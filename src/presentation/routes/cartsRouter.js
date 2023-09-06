import express, { Router } from 'express';
import authorization from '../../middlewares/authorization.js';
import {
  list,
  deleteOne,
  getOne,
  create,
  updateOne,
  closeCart,
  deleteOneProduct,
  updateQuantity,
  deleteAllproducts
} from '../controllers/cartsController.js';

const cartRouter = Router();

cartRouter.use(express.json());

cartRouter.get('/', authorization('getCarts'), list);
cartRouter.get('/:id', authorization('getOneCart'), getOne);
cartRouter.post('/', authorization('createCarts'), create);
cartRouter.put('/', authorization('updateOneCart'), updateOne);
cartRouter.put('/:id', authorization('closeCart'), closeCart);
cartRouter.put(
  '/:cid/products/:pid',
  authorization('updateQuantity'),
  updateQuantity
);
cartRouter.delete('/', authorization('deleteOneCart'), deleteOne);
cartRouter.delete(
  '/:cid/products/:pid',
  authorization('deleteOneProduct'),
  deleteOneProduct
);
cartRouter.delete('/', authorization('deleteAllProducts'), deleteAllproducts);
cartRouter.put('/:cid/purchase', closeCart);

export default cartRouter;
