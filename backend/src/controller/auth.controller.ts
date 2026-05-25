import {Request, Response} from "express"
import authService from "../service/auth.service"

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body)

      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          secure: false, // Set to true in production
          maxAge: 15 * 60 * 1000, // 15 minutes
          sameSite: "lax"
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "lax"
        })
        .status(201)
        .json({
          success: true,
          user: result.user
        })
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body)

      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          secure: false, // Set to true in production
          maxAge: 15 * 60 * 1000, // 15 minutes
          sameSite: "lax"
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "lax"
        })
        .status(200)
        .json({
          success: true,
          user: result.user
        })
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      })
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken
      const result = await authService.refresh(refreshToken)
      
      res
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 15 * 60 * 1000,
          sameSite: "lax"
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: "lax"
        })
        .status(200)
        .json({
          success: true,
          user: result.user
        })
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      })
    }
  }

  async logout(req: Request, res: Response) {
    const userId = (req as any).userId
    if (userId) {
      try {
        await authService.logout(parseInt(userId))
      } catch (err) {
        console.error("Logout database sync error:", err)
      }
    }
    
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        message: "Logged out",
      })
  }
}

export default new AuthController()
