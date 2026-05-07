import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.post("/register", userRegisterValidator(), validate, registerUser);
userRouter.post("/login", userLoginValidator(), validate, loginUser);

// protected routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/user", verifyJWT, getCurrentUser);

export default userRouter;
