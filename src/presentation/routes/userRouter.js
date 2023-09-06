import { Router } from 'express';
import authorization from '../../middlewares/authorization.js';
import auth from '../../middlewares/auth.js';
import {
  list,
  getOne,
  save,
  update,
  deleteOne
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.use(auth);
userRouter.get('/', authorization('getUsers'), list);
userRouter.get('/:id', authorization('getOneUser'), getOne);
userRouter.post('/', authorization('saveUser'), auth, save);
userRouter.put('/:id', authorization('updateUser'), update);
userRouter.delete('/:id', authorization('deleteUsers'), deleteOne);

export default userRouter;
