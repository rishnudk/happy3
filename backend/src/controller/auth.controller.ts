import { Request, Response } from "express";
import authService from "../service/auth.service";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/cookie.config";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);

      res
        .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
        .status(201)
        .json({
          success: true,
          user: result.user,
        });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      res.status(400).json({
        success: false,
        message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);

      res
        .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
        .status(200)
        .json({
          success: true,
          user: result.user,
        });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      res.status(401).json({
        success: false,
        message,
      });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const result = await authService.refresh(refreshToken);

      res
        .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
        .status(200)
        .json({
          success: true,
          user: result.user,
        });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Token refresh failed";
      res.status(401).json({
        success: false,
        message,
      });
    }
  }

  async logout(req: Request, res: Response) {
    const userId = (req as Request & { userId?: string }).userId;
    if (userId) {
      try {
        await authService.logout(parseInt(userId));
      } catch (err) {
        console.error("Logout database sync error:", err);
      }
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        message: "Logged out",
      });
  }
}

export default new AuthController();
