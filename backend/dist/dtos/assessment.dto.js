"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResponseSchema = exports.SubmitAssessmentSchema = void 0;
const zod_1 = require("zod");
const AnswerSchema = zod_1.z.object({
    questionId: zod_1.z.number().int().positive(),
    optionId: zod_1.z.number().int().positive(),
    mark: zod_1.z.number().int().min(0),
});
exports.SubmitAssessmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(200).trim(),
    emailId: zod_1.z.string().email("Invalid email address").trim(),
    phoneNumber: zod_1.z.string().min(5, "Phone number too short").max(20).trim(),
    answers: zod_1.z.array(AnswerSchema).min(1, "At least 1 answer required"),
});
exports.AssessmentResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    emailId: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
    totalScore: zod_1.z.number(),
    answers: zod_1.z.any(),
    createdAt: zod_1.z.date(),
});
