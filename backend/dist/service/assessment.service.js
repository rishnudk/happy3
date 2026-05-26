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
const assessmentRepository = new assessment_repository_1.AssessmentRepository();
class AssessmentService {
    submitAssessment(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, emailId, phoneNumber, answers } = body;
            if (!(name === null || name === void 0 ? void 0 : name.trim()) || !(emailId === null || emailId === void 0 ? void 0 : emailId.trim()) || !(phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.trim())) {
                throw new Error("Name, email, and phone number are required");
            }
            if (!(answers === null || answers === void 0 ? void 0 : answers.length)) {
                throw new Error("Answers are required");
            }
            const totalScore = answers.reduce((sum, a) => { var _a; return sum + ((_a = a.mark) !== null && _a !== void 0 ? _a : 0); }, 0);
            return yield assessmentRepository.createSubmission({
                name: name.trim(),
                emailId: emailId.trim(),
                phoneNumber: phoneNumber.trim(),
                totalScore,
                answers,
            });
        });
    }
}
exports.AssessmentService = AssessmentService;
