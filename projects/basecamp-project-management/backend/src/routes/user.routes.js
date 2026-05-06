import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";

const userRouter = Router();

userRouter.post("/register", userRegisterValidator(), validate, registerUser);
userRouter.post("/login", userLoginValidator(), validate, loginUser);

export default userRouter;
