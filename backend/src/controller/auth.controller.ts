import { Request, Response } from "express";
import authService from "../service/auth.service";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/cookie.config";
import { asyncHandler } from "../utils/asyncHandler";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    res
      .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
      .status(201)
      .json({
        success: true,
        user: result.user,
      });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    res
      .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
      .status(200)
      .json({
        success: true,
        user: result.user,
      });
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
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
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
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
  });
}

export default new AuthController();
