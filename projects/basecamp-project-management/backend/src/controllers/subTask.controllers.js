import taskModel from "../models/task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const getSubTasks = asyncHandler(async (req, res) => {});

const getSubTaskById = asyncHandler(async (req, res) => {});

const createSubTask = asyncHandler(async (req, res) => {});

const updateSubTask = asyncHandler(async (req, res) => {});

const deleteSubTask = asyncHandler(async (req, res) => {});

export { createSubTask, updateSubTask, deleteSubTask };
