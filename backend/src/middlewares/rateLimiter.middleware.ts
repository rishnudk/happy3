import rateLimit from "express-rate-limit";

/** Strict limiter for auth endpoints (login, register) */
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 attempts per minute
  message: {
    success: false,
    message: "Too many attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/** General limiter for all API routes */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
