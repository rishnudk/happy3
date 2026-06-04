"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionResponseSchema = exports.OptionResponseSchema = exports.UpdateQuestionSchema = exports.CreateQuestionSchema = void 0;
const zod_1 = require("zod");
const OptionInputSchema = zod_1.z.object({
    optionText: zod_1.z.string().min(1, "Option text is required"),
    mark: zod_1.z.number().int().min(0).max(10),
});
exports.CreateQuestionSchema = zod_1.z.object({
    questionNo: zod_1.z.number().int().positive(),
    category: zod_1.z.string().min(1).max(100),
    questionText: zod_1.z.string().min(1).max(2000),
    options: zod_1.z.array(OptionInputSchema).min(2, "At least 2 options required"),
});
exports.UpdateQuestionSchema = zod_1.z.object({
    questionNo: zod_1.z.number().int().positive().optional(),
    category: zod_1.z.string().min(1).max(100).optional(),
    questionText: zod_1.z.string().min(1).max(2000).optional(),
});
exports.OptionResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    optionText: zod_1.z.string(),
    mark: zod_1.z.number(),
    questionId: zod_1.z.number(),
});
exports.QuestionResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    questionNo: zod_1.z.number(),
    category: zod_1.z.string(),
    questionText: zod_1.z.string(),
    options: zod_1.z.array(exports.OptionResponseSchema).optional(),
});
