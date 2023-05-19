import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  list,
  getOne,
  save,
  update,
  deleteOne,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", list);
userRouter.get("/:id", getOne);
userRouter.get("/", auth, save);
userRouter.get("/:id", update);
userRouter.get("/:id", deleteOne);

export default userRouter;
