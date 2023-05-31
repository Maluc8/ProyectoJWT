import { Router } from "express";
//import  from "";
import {
  //forgetPassword,
  login,
  current,
  //login2,
  //logout,
  signup,
  //   register,
  //   fail,
} from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.post("/login", login);
sessionRouter.post("/current", auth, current);
sessionRouter.post("/signup", signup);

// sessionRouter.post("/logout",logout);
// sessionRouter.post("/forget-password",forgetPassword);

export default sessionRouter;
