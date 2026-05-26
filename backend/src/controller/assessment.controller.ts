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
      const message =
        error instanceof Error ? error.message : "Submission failed";

      res.status(400).json({
        success: false,
        message,
      });
    }
  }
}

export default new AssessmentController();
