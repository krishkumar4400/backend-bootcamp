import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotpassword,
  verifyEmail,
} from "../controllers/user.controllers.js";
import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPassword,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

// unsecured route
userRouter.post("/register", userRegisterValidator(), validate, registerUser);
userRouter.post("/login", userLoginValidator(), validate, loginUser);
userRouter.get("/verify-email/:verificationToken", verifyEmail);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.post(
  "/forgot-password",
  userForgotPasswordValidator(),
  validate,
  forgotPassword,
);
userRouter.post(
  "/reset-password/:resetToken",
  userResetForgotPassword(),
  validate,
  resetForgotpassword,
);

// protected routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/user", verifyJWT, getCurrentUser);
userRouter.post(
  "/change-password",
  verifyJWT,
  userChangeCurrentPasswordValidator(),
  validate,
  changeCurrentPassword,
);
userRouter.post('/resend-email-verification', verifyJWT, resendEmailVerification);

export default userRouter;
