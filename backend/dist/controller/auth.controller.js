"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../service/auth.service"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield auth_service_1.default.register(req.body);
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
                });
            }
            catch (error) {
                res.status(400).json({
                    message: error.message,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield auth_service_1.default.login(req.body);
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
                });
            }
            catch (error) {
                res.status(401).json({
                    message: error.message,
                });
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                const result = yield auth_service_1.default.refresh(refreshToken);
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
                });
            }
            catch (error) {
                res.status(401).json({
                    message: error.message,
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            if (userId) {
                try {
                    yield auth_service_1.default.logout(parseInt(userId));
                }
                catch (err) {
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
}
exports.default = new AuthController();
