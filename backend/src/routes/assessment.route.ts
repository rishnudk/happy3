import express from "express";
import assessmentController from "../controller/assessment.controller";

const assessmentRouter = express.Router();

assessmentRouter.post("/submit", assessmentController.submit);

export default assessmentRouter;
