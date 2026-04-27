import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks", getAllTasks);
taskRoutes.post("/tasks", createTask);
taskRoutes.put("/tasks/:id", updateTask);
taskRoutes.delete("/tasks/:id", deleteTask);
