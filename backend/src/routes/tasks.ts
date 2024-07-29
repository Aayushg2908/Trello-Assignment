import express from "express";
import { authMiddleware } from "../helpers/middleware";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  updateTaskOrder,
} from "../controllers/task";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getAllTasks);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.put("/update-order", authMiddleware, updateTaskOrder);

export default router;
