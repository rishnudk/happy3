import express from "express";
import { authController } from "../config/container";
import authMiddleware from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { authLimiter } from "../middlewares/rateLimiter.middleware";
import { RegisterSchema } from "../dtos/register.dto";
import { LoginSchema } from "../dtos/login.dto";

const authRouter = express.Router();

authRouter.post("/register", authLimiter, validate(RegisterSchema), authController.register);
authRouter.post("/login", authLimiter, validate(LoginSchema), authController.login);
authRouter.post("/refresh", authController.refresh);

authRouter.post("/logout", authMiddleware, authController.logout);

export default authRouter;
