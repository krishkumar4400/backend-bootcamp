import projectModel from "../models/project.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = projectModel.create({
    name,
    email,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project has been created"));
});

export const getUserProjects = asyncHandler(async (req, res) => {
  const user = req.user;
  const projects = await projectModel.find({ userId: user.id });

  return res.status(200).json(new ApiResponse(200, projects, ""));
});
