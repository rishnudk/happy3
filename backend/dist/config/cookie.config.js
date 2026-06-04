"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
const env_config_1 = require("./env.config");
const isProduction = env_config_1.env.NODE_ENV === "production";
exports.accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: "lax",
};
exports.refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "lax",
};
