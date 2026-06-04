import { CookieOptions } from "express";
import { env } from "./env.config";

const isProduction = env.NODE_ENV === "production";

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  maxAge: 15 * 60 * 1000, // 15 minutes
  sameSite: "lax",
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "lax",
};
