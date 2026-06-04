import { Request, Response } from "express";
import { AssessmentService } from "../service/assessment.service";
import { asyncHandler } from "../utils/asyncHandler";

const assessmentService = new AssessmentService();

class AssessmentController {
  submit = asyncHandler(async (req: Request, res: Response) => {
    const result = await assessmentService.submitAssessment(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  });

  getSubmissions = asyncHandler(async (req: Request, res: Response) => {
    const result = await assessmentService.getAllSubmissions();
    res.status(200).json({
      success: true,
      data: result,
    });
  });

  getSubmissionById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id), 10);
    const result = await assessmentService.getSubmissionById(id);
    
    res.status(200).json({
      success: true,
      data: result,
    });
  });
}

export default new AssessmentController();
