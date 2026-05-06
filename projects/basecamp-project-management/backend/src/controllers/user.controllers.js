import userModel from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendMail } from "../utils/mail.js";
import { ApiResponse } from "../utils/api-response.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens",
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existedUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exits", []);
  }

  const user = await userModel.create({
    email,
    username,
    password,
    role,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  // await generateAccessAndRefreshTokens(user._id);

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validationBeforeSave: false });

  sendMail({
    email: user?.email,
    subject: "verify Email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  }).catch(console.error);

  const createdUser = await userModel
    .findById(user._id)
    .select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdUser,
      },
      "User registered successfully and verification email has been sent on your email",
    ),
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await userModel.findOne({
    email
  });

  if (!user) {
    throw new ApiError(401, "Please enter valid details");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Please enter valid details");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await userModel
    .findById(user._id)
    .select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

