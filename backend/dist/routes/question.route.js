"use strict";
// routes/question.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const question_dto_1 = require("../dtos/question.dto");
const questionRouter = express_1.default.Router();
questionRouter.post("/", (0, validate_middleware_1.validate)(question_dto_1.CreateQuestionSchema), container_1.questionController.createQuestion);
questionRouter.get("/", container_1.questionController.getQuestions);
questionRouter.put("/:id", (0, validate_middleware_1.validate)(question_dto_1.UpdateQuestionSchema), container_1.questionController.updateQuestion);
questionRouter.delete("/:id", container_1.questionController.deleteQuestion);
exports.default = questionRouter;
