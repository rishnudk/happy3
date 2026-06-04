// routes/question.routes.ts

import express from "express";
import { questionController } from "../config/container";
import { validate } from "../middlewares/validate.middleware";
import { CreateQuestionSchema, UpdateQuestionSchema } from "../dtos/question.dto";

const questionRouter = express.Router();

questionRouter.post("/", validate(CreateQuestionSchema), questionController.createQuestion);
questionRouter.get("/", questionController.getQuestions);
questionRouter.put("/:id", validate(UpdateQuestionSchema), questionController.updateQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);

export default questionRouter;
