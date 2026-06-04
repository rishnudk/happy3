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
const question_dto_1 = require("../dtos/question.dto");
class OptionService {
    constructor(questionRepository, optionRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
    }
    assertQuestionExists(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield this.questionRepository.getQuestionById(questionId);
            if (!question || question.isDeleted) {
                const { NotFoundError } = require("../utils/errors");
                throw new NotFoundError("Question not found");
            }
            return question;
        });
    }
    updateOptionsByQuestionId(questionId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assertQuestionExists(questionId);
            yield this.optionRepository.deleteOptionsByQuestionId(questionId);
            if (options === null || options === void 0 ? void 0 : options.length) {
                yield this.optionRepository.createManyOptions(questionId, options);
            }
            const result = yield this.questionRepository.getQuestionById(questionId);
            return question_dto_1.QuestionResponseSchema.parse(result);
        });
    }
    deleteOptionsByQuestionId(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assertQuestionExists(questionId);
            return yield this.optionRepository.deleteOptionsByQuestionId(questionId);
        });
    }
}
exports.OptionService = OptionService;
