"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionResponseSchema = exports.UpdateOptionsSchema = void 0;
const zod_1 = require("zod");
const OptionItemSchema = zod_1.z.object({
    optionText: zod_1.z.string().min(1, "Option text is required"),
    mark: zod_1.z.number().int().min(0).max(10),
});
exports.UpdateOptionsSchema = zod_1.z.object({
    options: zod_1.z.array(OptionItemSchema).min(1, "At least 1 option required"),
});
exports.OptionResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    optionText: zod_1.z.string(),
    mark: zod_1.z.number(),
    questionId: zod_1.z.number(),
});
