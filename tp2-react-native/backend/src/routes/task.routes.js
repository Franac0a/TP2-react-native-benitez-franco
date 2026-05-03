import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks", getAllTasks);
taskRoutes.get("/tasks/:id", getTaskById);
taskRoutes.post("/tasks", createTask);
taskRoutes.put("/tasks/:id", updateTask);
taskRoutes.delete("/tasks/:id", deleteTask);
