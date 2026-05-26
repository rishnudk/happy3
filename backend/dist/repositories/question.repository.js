"use strict";
// repositories/question.repository.ts
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
exports.QuestionRepository = void 0;
const db_config_1 = require("../config/db.config");
class QuestionRepository {
    createQuestion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.question.create({
                data,
            });
        });
    }
    getAllQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.question.findMany({
                where: {
                    isDeleted: false,
                },
                include: {
                    options: true,
                },
                orderBy: {
                    questionNo: "asc",
                },
            });
        });
    }
    getQuestionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.question.findUnique({
                where: { id },
                include: {
                    options: true,
                },
            });
        });
    }
    updateQuestion(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.question.update({
                where: { id },
                data,
            });
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.question.update({
                where: { id },
                data: {
                    isDeleted: true,
                },
            });
        });
    }
}
exports.QuestionRepository = QuestionRepository;
