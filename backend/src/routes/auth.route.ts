import express from "express"
import authController from "../controller/auth.controller"
import authMiddleware from "../middlewares/auth.middleware"

const authRouter = express.Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login) 
authRouter.post("/refresh", authController.refresh)

authRouter.post("/logout", authMiddleware, authController.logout)

export default authRouter
