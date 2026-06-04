"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/** Strict limiter for auth endpoints (login, register) */
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 attempts per minute
    message: {
        success: false,
        message: "Too many attempts, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
/** General limiter for all API routes */
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: {
        success: false,
        message: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
