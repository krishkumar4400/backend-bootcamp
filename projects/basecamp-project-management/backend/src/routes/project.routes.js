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
  updateProjectMemberRoleValidator,
} from "../validators/index.js";
import {
  projectValidation,
  
} from "../middlewares/validator.middlewares.js";
import { validateProjectPermission } from "../middlewares/project.middlewares.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const projectRouter = Router();

projectRouter.use(verifyJWT);

projectRouter
  .route("/")
  .post(createNewProjectValidator(), projectValidation, createProject)
  .get(getProjects);

projectRouter
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .patch(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateProjectValidator(),
    projectValidation,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

projectRouter
  .route("/:projectId/members")
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator(),
    projectValidation,
    addMembersToProject,
  )
  .get(getProjectMembers);

projectRouter
  .route("/:projectId/members/:userId")
  .patch(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    updateProjectMemberRoleValidator(),
    projectValidation,
    updateProjectMemberRole,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default projectRouter;
