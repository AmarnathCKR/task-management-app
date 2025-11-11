import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/tasks";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "https://legendary-halibut-q779wj7rjgwc497x-5173.app.github.dev",
      credentials: true,
    })
  );

  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  return app;
};
