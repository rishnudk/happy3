"use strict";
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
exports.AssessmentController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
class AssessmentController {
    constructor(assessmentService) {
        this.assessmentService = assessmentService;
        this.submit = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.assessmentService.submitAssessment(req.body);
            res.status(201).json({
                success: true,
                data: result,
            });
        }));
        this.getSubmissions = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.assessmentService.getAllSubmissions();
            res.status(200).json({
                success: true,
                data: result,
            });
        }));
        this.getSubmissionById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(String(req.params.id), 10);
            const result = yield this.assessmentService.getSubmissionById(id);
            res.status(200).json({
                success: true,
                data: result,
            });
        }));
    }
}
exports.AssessmentController = AssessmentController;
