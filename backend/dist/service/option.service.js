"use strict";
// services/option.service.ts
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
exports.OptionService = void 0;
const question_repository_1 = require("../repositories/question.repository");
const option_repository_1 = require("../repositories/option.repository");
const questionRepository = new question_repository_1.QuestionRepository();
const optionRepository = new option_repository_1.OptionRepository();
class OptionService {
    assertQuestionExists(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield questionRepository.getQuestionById(questionId);
            if (!question || question.isDeleted) {
                throw new Error("Question not found");
            }
            return question;
        });
    }
    updateOptionsByQuestionId(questionId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assertQuestionExists(questionId);
            yield optionRepository.deleteOptionsByQuestionId(questionId);
            if (options === null || options === void 0 ? void 0 : options.length) {
                yield optionRepository.createManyOptions(questionId, options);
            }
            return yield questionRepository.getQuestionById(questionId);
        });
    }
    deleteOptionsByQuestionId(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assertQuestionExists(questionId);
            return yield optionRepository.deleteOptionsByQuestionId(questionId);
        });
    }
}
exports.OptionService = OptionService;
