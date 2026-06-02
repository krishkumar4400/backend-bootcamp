import { Router } from "express";
import { createProject } from "../controllers/project.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createNewProjectValidator } from "../validators/index.js";
import { projectValidation } from "../middlewares/validator.middlewares.js";

const projectRouter = Router();

projectRouter.post(
  "/",
  verifyJWT,
  createNewProjectValidator(),
  projectValidation,
  createProject,
);


projectRouter.get('/', verifyJWT, )

export default projectRouter;
