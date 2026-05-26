"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const authRouter = express_1.default.Router();
authRouter.post("/register", auth_controller_1.default.register);
authRouter.post("/login", auth_controller_1.default.login);
authRouter.post("/refresh", auth_controller_1.default.refresh);
authRouter.post("/logout", auth_middleware_1.default, auth_controller_1.default.logout);
exports.default = authRouter;
