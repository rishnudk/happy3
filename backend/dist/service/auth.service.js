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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const errors_1 = require("../utils/errors");
const jwt_1 = require("../utils/jwt");
class AuthService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield auth_repository_1.default.findByUsername(data.username);
            if (existingUser) {
                throw new errors_1.ConflictError("Username already taken");
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const user = yield auth_repository_1.default.createUser(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            const accessToken = (0, jwt_1.generateAccessToken)(user.id.toString());
            const refreshToken = (0, jwt_1.generateRefreshToken)(user.id.toString());
            yield auth_repository_1.default.updateRefreshToken(user.id, refreshToken);
            return { user, accessToken, refreshToken };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_repository_1.default.findByUsername(data.username);
            if (!user) {
                throw new errors_1.UnauthorizedError("Invalid credentials");
            }
            const isMatch = yield bcrypt_1.default.compare(data.password, user.password);
            if (!isMatch) {
                throw new errors_1.UnauthorizedError("Invalid credentials");
            }
            const accessToken = (0, jwt_1.generateAccessToken)(user.id.toString());
            const refreshToken = (0, jwt_1.generateRefreshToken)(user.id.toString());
            yield auth_repository_1.default.updateRefreshToken(user.id, refreshToken);
            return { user, accessToken, refreshToken };
        });
    }
    refresh(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.UnauthorizedError("No refresh token provided");
            const decoded = (0, jwt_1.verifyRefreshToken)(token);
            const user = yield auth_repository_1.default.findById(parseInt(decoded.id));
            if (!user || user.refreshToken !== token) {
                throw new errors_1.UnauthorizedError("Invalid refresh token");
            }
            const newAccessToken = (0, jwt_1.generateAccessToken)(user.id.toString());
            const newRefreshToken = (0, jwt_1.generateRefreshToken)(user.id.toString());
            yield auth_repository_1.default.updateRefreshToken(user.id, newRefreshToken);
            return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_repository_1.default.updateRefreshToken(userId, null);
        });
    }
}
exports.default = new AuthService();
