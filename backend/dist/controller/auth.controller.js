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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const cookie_config_1 = require("../config/cookie.config");
const asyncHandler_1 = require("../utils/asyncHandler");
const logger_1 = require("../utils/logger");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.register(req.body);
            res
                .cookie("accessToken", result.accessToken, cookie_config_1.accessTokenCookieOptions)
                .cookie("refreshToken", result.refreshToken, cookie_config_1.refreshTokenCookieOptions)
                .status(201)
                .json({
                success: true,
                user: result.user,
            });
        }));
        this.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.login(req.body);
            res
                .cookie("accessToken", result.accessToken, cookie_config_1.accessTokenCookieOptions)
                .cookie("refreshToken", result.refreshToken, cookie_config_1.refreshTokenCookieOptions)
                .status(200)
                .json({
                success: true,
                user: result.user,
            });
        }));
        this.refresh = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            const result = yield this.authService.refresh(refreshToken);
            res
                .cookie("accessToken", result.accessToken, cookie_config_1.accessTokenCookieOptions)
                .cookie("refreshToken", result.refreshToken, cookie_config_1.refreshTokenCookieOptions)
                .status(200)
                .json({
                success: true,
                user: result.user,
            });
        }));
        this.logout = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            if (userId) {
                try {
                    yield this.authService.logout(parseInt(userId));
                }
                catch (err) {
                    logger_1.logger.error(err, "Logout database sync error:");
                }
            }
            res
                .clearCookie("accessToken")
                .clearCookie("refreshToken")
                .json({
                success: true,
                message: "Logged out",
            });
        }));
    }
}
exports.AuthController = AuthController;
