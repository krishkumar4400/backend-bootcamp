import { Router } from "express";
import {
  addMembersToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateProject,
  updateProjectMemberRole,
} from "../controllers/project.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addMemberToProjectValidator,
  createNewProjectValidator,
  updateProjectValidator,
} from "../validators/index.js";
import {
  projectValidation,
  validate,
} from "../middlewares/validator.middlewares.js";

const projectRouter = Router();

projectRouter.post(
  "/",
  verifyJWT,
  createNewProjectValidator(),
  projectValidation,
  createProject,
);

projectRouter.get("/projects", verifyJWT, getProjects);

projectRouter.get("/projects/:projectId", verifyJWT, getProjectById);

projectRouter.patch(
  "/project/:projectId",
  updateProjectValidator(),
  projectValidation,
  verifyJWT,
  updateProject,
);

projectRouter.delete("/project/:projectId", verifyJWT, deleteProject);

projectRouter.post(
  "project/:projectId",
  verifyJWT,
  addMemberToProjectValidator(),
  projectValidation,
  addMembersToProject,
);

projectRouter.get("/project/:projectId", verifyJWT, getProjectMembers);

projectRouter.patch(
  "/projects/:projectId/:userId",
  verifyJWT,
  updateProjectMemberRole,
);
projectRouter.delete("/projects/:projectId/:userId", verifyJWT, deleteMember);

export default projectRouter;
