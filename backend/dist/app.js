"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const question_route_1 = __importDefault(require("./routes/question.route"));
const option_route_1 = __importDefault(require("./routes/option.route"));
const assessment_route_1 = __importDefault(require("./routes/assessment.route"));
const app = (0, express_1.default)();
console.log("CORS:", process.env.CORS_ORIGINS);
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : [];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS policy: This origin is not allowed"), false);
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/questions", question_route_1.default);
app.use("/api/options", option_route_1.default);
app.use("/api/assessment", assessment_route_1.default);
exports.default = app;
