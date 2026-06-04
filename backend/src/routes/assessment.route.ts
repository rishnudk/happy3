import express from "express";
import assessmentController from "../controller/assessment.controller";
import { validate } from "../middlewares/validate.middleware";
import { SubmitAssessmentSchema } from "../dtos/assessment.dto";

const assessmentRouter = express.Router();

assessmentRouter.post("/submit", validate(SubmitAssessmentSchema), assessmentController.submit);
assessmentRouter.get("/submissions", assessmentController.getSubmissions);
assessmentRouter.get("/submission/:id", assessmentController.getSubmissionById);

export default assessmentRouter;
