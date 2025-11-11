import { Request, Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/auth";
import mongoose from "mongoose";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const task = new Task({
      title,
      description,
      status: status || "pending",
      createdBy: req.user!.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("createdBy", "name email"),
      Task.countDocuments(filter),
    ]);

    res.json({ tasks, total, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid id" });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // only allow owner or admin to update
    if (task.createdBy.toString() !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(task, update);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
