"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assessment_controller_1 = __importDefault(require("../controller/assessment.controller"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const assessment_dto_1 = require("../dtos/assessment.dto");
const assessmentRouter = express_1.default.Router();
assessmentRouter.post("/submit", (0, validate_middleware_1.validate)(assessment_dto_1.SubmitAssessmentSchema), assessment_controller_1.default.submit);
assessmentRouter.get("/submissions", assessment_controller_1.default.getSubmissions);
assessmentRouter.get("/submission/:id", assessment_controller_1.default.getSubmissionById);
exports.default = assessmentRouter;
