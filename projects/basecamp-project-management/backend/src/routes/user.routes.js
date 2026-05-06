import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { userRegisterValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";

const userRouter = Router();

userRouter.post("/register", userRegisterValidator(), validate, registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
