// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Handle Zod Validation Errors (if not caught by validate middleware)
  if (err.name === "ZodError") {
    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: (err as any).errors,
    });
    return;
  }

  // Default to 500 server error
  console.error("Unhandled Exception:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
