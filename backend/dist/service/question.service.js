"use strict";
// services/question.service.ts
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
exports.QuestionService = void 0;
const question_repository_1 = require("../repositories/question.repository");
const option_repository_1 = require("../repositories/option.repository");
const questionRepository = new question_repository_1.QuestionRepository();
const optionRepository = new option_repository_1.OptionRepository();
class QuestionService {
    createQuestionWithOptions(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionNo, category, questionText, options } = body;
            const question = yield questionRepository.createQuestion({
                questionNo,
                category,
                questionText,
            });
            if (options === null || options === void 0 ? void 0 : options.length) {
                yield optionRepository.createManyOptions(question.id, options);
            }
            return yield questionRepository.getQuestionById(question.id);
        });
    }
    getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield questionRepository.getAllQuestions();
        });
    }
    updateQuestion(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionNo, category, questionText } = body;
            yield questionRepository.updateQuestion(id, {
                questionNo,
                category,
                questionText,
            });
            return yield questionRepository.getQuestionById(id);
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield questionRepository.deleteQuestion(id);
        });
    }
}
exports.QuestionService = QuestionService;
