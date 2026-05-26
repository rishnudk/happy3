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
const assessment_service_1 = require("../service/assessment.service");
const assessmentService = new assessment_service_1.AssessmentService();
class AssessmentController {
    submit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield assessmentService.submitAssessment(req.body);
                res.status(201).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Submission failed";
                res.status(400).json({
                    success: false,
                    message,
                });
            }
        });
    }
}
exports.default = new AssessmentController();
