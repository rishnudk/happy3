"use strict";
// routes/option.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../config/container");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const option_dto_1 = require("../dtos/option.dto");
const optionRouter = express_1.default.Router();
optionRouter.put("/:questionId", (0, validate_middleware_1.validate)(option_dto_1.UpdateOptionsSchema), container_1.optionController.updateOptions);
optionRouter.delete("/:questionId", container_1.optionController.deleteOptions);
exports.default = optionRouter;
