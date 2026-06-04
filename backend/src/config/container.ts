import { AuthRepository } from "../repositories/auth.repository";
import { QuestionRepository } from "../repositories/question.repository";
import { OptionRepository } from "../repositories/option.repository";
import { AssessmentRepository } from "../repositories/assessment.repository";

import { AuthService } from "../service/auth.service";
import { QuestionService } from "../service/question.service";
import { OptionService } from "../service/option.service";
import { AssessmentService } from "../service/assessment.service";

import { AuthController } from "../controller/auth.controller";
import { QuestionController } from "../controller/question.controller";
import { OptionController } from "../controller/option.controller";
import { AssessmentController } from "../controller/assessment.controller";

// 1. Repositories
const authRepository = new AuthRepository();
const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();
const assessmentRepository = new AssessmentRepository();

// 2. Services
const authService = new AuthService(authRepository);
const questionService = new QuestionService(questionRepository, optionRepository);
const optionService = new OptionService(questionRepository, optionRepository);
const assessmentService = new AssessmentService(assessmentRepository);

// 3. Controllers
const authController = new AuthController(authService);
const questionController = new QuestionController(questionService);
const optionController = new OptionController(optionService);
const assessmentController = new AssessmentController(assessmentService);

export {
  authController,
  questionController,
  optionController,
  assessmentController,
};
