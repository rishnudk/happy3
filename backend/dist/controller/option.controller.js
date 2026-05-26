"use strict";
// controllers/option.controller.ts
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
const option_service_1 = require("../service/option.service");
const optionService = new option_service_1.OptionService();
class OptionController {
    updateOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionId = parseInt(String(req.params.questionId), 10);
                const { options } = req.body;
                const result = yield optionService.updateOptionsByQuestionId(questionId, options !== null && options !== void 0 ? options : []);
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                const status = error.message === "Question not found" ? 404 : 500;
                res.status(status).json({
                    success: false,
                    message: error.message === "Question not found"
                        ? error.message
                        : "Options update failed",
                });
            }
        });
    }
    deleteOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questionId = parseInt(String(req.params.questionId), 10);
                const result = yield optionService.deleteOptionsByQuestionId(questionId);
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                const status = error.message === "Question not found" ? 404 : 500;
                res.status(status).json({
                    success: false,
                    message: error.message === "Question not found"
                        ? error.message
                        : "Options deletion failed",
                });
            }
        });
    }
}
exports.default = new OptionController();
