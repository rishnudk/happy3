import express from "express";
import { assessmentController } from "../config/container";
import { validate } from "../middlewares/validate.middleware";
import { SubmitAssessmentSchema } from "../dtos/assessment.dto";

const assessmentRouter = express.Router();

assessmentRouter.post("/", validate(SubmitAssessmentSchema), assessmentController.submit);
assessmentRouter.get("/", assessmentController.getSubmissions);
assessmentRouter.get("/:id", assessmentController.getSubmissionById);

export default assessmentRouter;
