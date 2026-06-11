import taskModel from "../models/task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const getTasks = asyncHandler(async (req, res) => {});

const getTaskById = asyncHandler(async (req, res) => {});

const createTask = asyncHandler(async (req, res) => {});

const updateTask = asyncHandler(async (req, res) => {});

const deleteTask = asyncHandler(async (req, res) => {});

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
