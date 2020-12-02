import { Router } from "express";
import {
  addLabel,
  createTask,
  deleteLabel,
  deleteTaskById,
  getAllLabelsOfTask,
  getAllTasks,
  getAllTrackingsOfTask,
  getTaskById,
  updateTaskById,
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", getAllTasks);

taskRouter.post("/", createTask);

taskRouter.get("/:taskId", getTaskById);

taskRouter.delete("/:taskId", deleteTaskById);

taskRouter.patch("/:taskId", updateTaskById);

taskRouter.post("/:taskId/label", addLabel);

taskRouter.delete("/:taskId/label", deleteLabel);

taskRouter.get("/:taskId/labels", getAllLabelsOfTask);

taskRouter.get("/:taskId/trackings", getAllTrackingsOfTask);