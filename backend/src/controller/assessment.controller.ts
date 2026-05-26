import { Request, Response } from "express";
import { AssessmentService } from "../service/assessment.service";

const assessmentService = new AssessmentService();

class AssessmentController {
  async submit(req: Request, res: Response) {
    try {
      const result = await assessmentService.submitAssessment(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      console.error("Error in submit assessment:", error);
      const message =
        error instanceof Error ? error.message : "Submission failed";

      res.status(400).json({
        success: false,
        message,
      });
    }
  }

  async getSubmissions(req: Request, res: Response) {
    try {
      const result = await assessmentService.getAllSubmissions();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      console.error("Error in getSubmissions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get submissions",
      });
    }
  }

  async getSubmissionById(req: Request, res: Response) {
    try {
      const id = parseInt(String(req.params.id), 10);
      const result = await assessmentService.getSubmissionById(id);
      if (!result) {
        res.status(404).json({
          success: false,
          message: "Submission not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      console.error("Error in getSubmissionById:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get submission",
      });
    }
  }
}

export default new AssessmentController();
