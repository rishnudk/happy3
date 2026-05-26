"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    // Extract access token from cookies, falling back to Authorization header
    let token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || "";
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - Access Token missing",
        });
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid or expired token",
        });
    }
};
exports.default = authMiddleware;
