"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessmentController = exports.optionController = exports.questionController = exports.authController = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const question_repository_1 = require("../repositories/question.repository");
const option_repository_1 = require("../repositories/option.repository");
const assessment_repository_1 = require("../repositories/assessment.repository");
const auth_service_1 = require("../service/auth.service");
const question_service_1 = require("../service/question.service");
const option_service_1 = require("../service/option.service");
const assessment_service_1 = require("../service/assessment.service");
const auth_controller_1 = require("../controller/auth.controller");
const question_controller_1 = require("../controller/question.controller");
const option_controller_1 = require("../controller/option.controller");
const assessment_controller_1 = require("../controller/assessment.controller");
// 1. Repositories
const authRepository = new auth_repository_1.AuthRepository();
const questionRepository = new question_repository_1.QuestionRepository();
const optionRepository = new option_repository_1.OptionRepository();
const assessmentRepository = new assessment_repository_1.AssessmentRepository();
// 2. Services
const authService = new auth_service_1.AuthService(authRepository);
const questionService = new question_service_1.QuestionService(questionRepository, optionRepository);
const optionService = new option_service_1.OptionService(questionRepository, optionRepository);
const assessmentService = new assessment_service_1.AssessmentService(assessmentRepository);
// 3. Controllers
const authController = new auth_controller_1.AuthController(authService);
exports.authController = authController;
const questionController = new question_controller_1.QuestionController(questionService);
exports.questionController = questionController;
const optionController = new option_controller_1.OptionController(optionService);
exports.optionController = optionController;
const assessmentController = new assessment_controller_1.AssessmentController(assessmentService);
exports.assessmentController = assessmentController;
