// routes/question.routes.ts

import express from "express";
import questionController from "../controller/question.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateQuestionSchema, UpdateQuestionSchema } from "../dtos/question.dto";

const questionRouter = express.Router();

questionRouter.post("/createQuestion", validate(CreateQuestionSchema), questionController.createQuestion);
questionRouter.get("/getAllQuestions", questionController.getQuestions);
questionRouter.put("/updateQuestion/:id", validate(UpdateQuestionSchema), questionController.updateQuestion);
questionRouter.delete("/deleteQuestion/:id", questionController.deleteQuestion);

export default questionRouter;
