"use strict";
// routes/option.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const option_controller_1 = __importDefault(require("../controller/option.controller"));
const optionRouter = express_1.default.Router();
optionRouter.put("/updateOptions/:questionId", option_controller_1.default.updateOptions);
optionRouter.delete("/deleteOptions/:questionId", option_controller_1.default.deleteOptions);
exports.default = optionRouter;
