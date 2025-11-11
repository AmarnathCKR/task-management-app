import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in ms (matches refresh token expiry)
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || "user" });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
    const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });

    // store refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();

    // set cookie (httpOnly)
    res.cookie("jid", refreshToken, COOKIE_OPTIONS);

    // return access token in body (frontend will use it for Authorization header)
    res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.jid;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (e) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "User not found" });

    // confirm token is one we issued
    if (!user.refreshTokens.includes(token)) {
      // token reuse detection: clear all tokens for user
      user.refreshTokens = [];
      await user.save();
      return res.status(401).json({ message: "Token not recognized" });
    }

    // rotate: issue new refresh token and remove old one
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    const newRefreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    const newAccessToken = signAccessToken({ sub: user._id.toString(), role: user.role });

    res.cookie("jid", newRefreshToken, COOKIE_OPTIONS);
    res.json({ accessToken: newAccessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.jid;
    if (token) {
      // remove token from DB
      const user = await User.findOne({ refreshTokens: token });
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
        await user.save();
      }
    }
    res.clearCookie("jid", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
