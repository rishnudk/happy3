"use strict";
// routes/question.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = __importDefault(require("../controller/question.controller"));
const questionRouter = express_1.default.Router();
questionRouter.post("/createQuestion", question_controller_1.default.createQuestion);
questionRouter.get("/getAllQuestions", question_controller_1.default.getQuestions);
questionRouter.put("/updateQuestion/:id", question_controller_1.default.updateQuestion);
questionRouter.delete("/deleteQuestion/:id", question_controller_1.default.deleteQuestion);
exports.default = questionRouter;
