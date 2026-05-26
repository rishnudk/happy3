import express from "express";
import assessmentController from "../controller/assessment.controller";

const assessmentRouter = express.Router();

assessmentRouter.post("/submit", assessmentController.submit);
assessmentRouter.get("/submissions", assessmentController.getSubmissions);
assessmentRouter.get("/submission/:id", assessmentController.getSubmissionById);

export default assessmentRouter;
