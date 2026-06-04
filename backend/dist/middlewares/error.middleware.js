"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    // Handle Zod Validation Errors (if not caught by validate middleware)
    if (err.name === "ZodError") {
        res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.errors,
        });
        return;
    }
    // Default to 500 server error
    logger_1.logger.error(err, "Unhandled Exception:");
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
