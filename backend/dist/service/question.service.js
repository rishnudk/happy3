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
const question_dto_1 = require("../dtos/question.dto");
class QuestionService {
    constructor(questionRepository, optionRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }
    createQuestionWithOptions(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionNo, category, questionText, options } = body;
            const question = yield this.questionRepository.createQuestion({
                questionNo,
                category,
                questionText,
            });
            if (options === null || options === void 0 ? void 0 : options.length) {
                yield this.optionRepository.createManyOptions(question.id, options);
            }
            const result = yield this.questionRepository.getQuestionById(question.id);
            return question_dto_1.QuestionResponseSchema.parse(result);
        });
    }
    getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.questionRepository.getAllQuestions();
            return results.map(q => question_dto_1.QuestionResponseSchema.parse(q));
        });
    }
    updateQuestion(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionNo, category, questionText } = body;
            yield this.questionRepository.updateQuestion(id, {
                questionNo,
                category,
                questionText,
            });
            const result = yield this.questionRepository.getQuestionById(id);
            return question_dto_1.QuestionResponseSchema.parse(result);
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.questionRepository.deleteQuestion(id);
            return question_dto_1.QuestionResponseSchema.parse(result);
        });
    }
}
exports.QuestionService = QuestionService;
