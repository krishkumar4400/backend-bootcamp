import { body } from "express-validator";

export const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .isString(),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long")
      .isString(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long")
      .isString(),
    body("fullname").optional().trim(),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isString()
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Enter a valid password"),
  ];
};
