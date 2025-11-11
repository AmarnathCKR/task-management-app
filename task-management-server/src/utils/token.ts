import jwt, { SignOptions, Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

const ACCESS_EXPIRES = (process.env.ACCESS_TOKEN_EXPIRES_IN || "15m") as StringValue;
const REFRESH_EXPIRES = (process.env.REFRESH_TOKEN_EXPIRES_IN || "7d") as StringValue;
const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET || "access-secret";
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || "refresh-secret";

export interface TokenPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const signAccessToken = (payload: { sub: string; role: string }) => {
  const options: SignOptions = { expiresIn: ACCESS_EXPIRES };
  return jwt.sign(payload, ACCESS_SECRET, options);
};

export const signRefreshToken = (payload: { sub: string; role: string }) => {
  const options: SignOptions = { expiresIn: REFRESH_EXPIRES };
  return jwt.sign(payload, REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, ACCESS_SECRET) as TokenPayload;

export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, REFRESH_SECRET) as TokenPayload;
