import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  // Extract access token from cookies, falling back to Authorization header
  let token = req.cookies?.accessToken || "";
  
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Access Token missing",
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
};

export default authMiddleware;
