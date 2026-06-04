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
exports.AssessmentService = void 0;
const assessment_repository_1 = require("../repositories/assessment.repository");
const errors_1 = require("../utils/errors");
const assessmentRepository = new assessment_repository_1.AssessmentRepository();
class AssessmentService {
    submitAssessment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, emailId, phoneNumber, answers } = body;
            const totalScore = answers.reduce((sum, a) => { var _a; return sum + ((_a = a.mark) !== null && _a !== void 0 ? _a : 0); }, 0);
            return yield assessmentRepository.createSubmission({
                name,
                emailId,
                phoneNumber,
                totalScore,
                answers,
            });
        });
    }
    getAllSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield assessmentRepository.getAllSubmissions();
        });
    }
    getSubmissionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = yield assessmentRepository.getSubmissionById(id);
            if (!submission) {
                throw new errors_1.NotFoundError("Submission not found");
            }
            return submission;
        });
    }
}
exports.AssessmentService = AssessmentService;
