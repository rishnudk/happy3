"use strict";
// repositories/option.repository.ts
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
exports.OptionRepository = void 0;
const db_config_1 = require("../config/db.config");
class OptionRepository {
    createOption(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.option.create({
                data,
            });
        });
    }
    createManyOptions(questionId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.length) {
                return { count: 0 };
            }
            return yield db_config_1.prisma.option.createMany({
                data: options.map((option) => ({
                    optionText: option.optionText,
                    mark: option.mark,
                    questionId,
                })),
            });
        });
    }
    deleteOptionsByQuestionId(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.option.deleteMany({
                where: { questionId },
            });
        });
    }
    deleteOption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_config_1.prisma.option.delete({
                where: { id },
            });
        });
    }
}
exports.OptionRepository = OptionRepository;
