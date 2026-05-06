import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { userRegisterValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";

const userRouter = Router();

userRouter.post("/register", userRegisterValidator(), validate, registerUser);

export default userRouter;
