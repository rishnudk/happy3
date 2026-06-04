"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters").max(50),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128),
    name: zod_1.z.string().min(1).max(100).optional(),
    emailId: zod_1.z.string().email("Invalid email address").optional(),
    phoneNumber: zod_1.z.string().min(5).max(20).optional(),
});
