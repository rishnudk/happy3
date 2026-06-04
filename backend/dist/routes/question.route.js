"use strict";
// routes/question.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = __importDefault(require("../controller/question.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const question_dto_1 = require("../dtos/question.dto");
const questionRouter = express_1.default.Router();
questionRouter.post("/createQuestion", (0, validate_middleware_1.validate)(question_dto_1.CreateQuestionSchema), question_controller_1.default.createQuestion);
questionRouter.get("/getAllQuestions", question_controller_1.default.getQuestions);
questionRouter.put("/updateQuestion/:id", (0, validate_middleware_1.validate)(question_dto_1.UpdateQuestionSchema), question_controller_1.default.updateQuestion);
questionRouter.delete("/deleteQuestion/:id", question_controller_1.default.deleteQuestion);
exports.default = questionRouter;
