"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const rateLimiter_middleware_1 = require("../middlewares/rateLimiter.middleware");
const register_dto_1 = require("../dtos/register.dto");
const login_dto_1 = require("../dtos/login.dto");
const authRouter = express_1.default.Router();
authRouter.post("/register", rateLimiter_middleware_1.authLimiter, (0, validate_middleware_1.validate)(register_dto_1.RegisterSchema), auth_controller_1.default.register);
authRouter.post("/login", rateLimiter_middleware_1.authLimiter, (0, validate_middleware_1.validate)(login_dto_1.LoginSchema), auth_controller_1.default.login);
authRouter.post("/refresh", auth_controller_1.default.refresh);
authRouter.post("/logout", auth_middleware_1.default, auth_controller_1.default.logout);
exports.default = authRouter;
