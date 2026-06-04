"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const assessment_dto_1 = require("../dtos/assessment.dto");
const assessmentRouter = express_1.default.Router();
assessmentRouter.post("/", (0, validate_middleware_1.validate)(assessment_dto_1.SubmitAssessmentSchema), container_1.assessmentController.submit);
assessmentRouter.get("/", container_1.assessmentController.getSubmissions);
assessmentRouter.get("/:id", container_1.assessmentController.getSubmissionById);
exports.default = assessmentRouter;
