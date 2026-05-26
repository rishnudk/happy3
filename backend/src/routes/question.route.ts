// routes/question.routes.ts

import express from "express";
import questionController from "../controller/question.controller";

const questionRouter = express.Router();

questionRouter.post("/createQuestion", questionController.createQuestion);
questionRouter.get("/getAllQuestions", questionController.getQuestions);
questionRouter.put("/updateQuestion/:id", questionController.updateQuestion);
questionRouter.delete("/deleteQuestion/:id", questionController.deleteQuestion);

export default questionRouter;
