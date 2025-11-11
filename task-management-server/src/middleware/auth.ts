import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token";
import User from "../models/User";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
   
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
