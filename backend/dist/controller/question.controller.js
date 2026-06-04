"use strict";
// controllers/question.controller.ts
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
const question_service_1 = require("../service/question.service");
const asyncHandler_1 = require("../utils/asyncHandler");
const questionService = new question_service_1.QuestionService();
class QuestionController {
    constructor() {
        this.createQuestion = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield questionService.createQuestionWithOptions(req.body);
            res.status(201).json({
                success: true,
                data: result,
            });
        }));
        this.getQuestions = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const questions = yield questionService.getQuestions();
            res.status(200).json({
                success: true,
                data: questions,
            });
        }));
        this.updateQuestion = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(String(req.params.id), 10);
            const result = yield questionService.updateQuestion(id, req.body);
            res.status(200).json({
                success: true,
                data: result,
            });
        }));
        this.deleteQuestion = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(String(req.params.id), 10);
            const result = yield questionService.deleteQuestion(id);
            res.status(200).json({
                success: true,
                data: result,
            });
        }));
    }
}
exports.default = new QuestionController();
