import { Router } from "express";
import {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/roles";

const router = Router();

router.get("/", listTasks); // public listing (or you can requireAuth)
router.post("/", requireAuth, createTask);
router.get("/:id", getTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, requireRole("admin"), deleteTask);

export default router;
