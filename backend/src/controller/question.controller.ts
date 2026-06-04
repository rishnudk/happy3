// controllers/question.controller.ts

import { Request, Response } from "express";
import { QuestionService } from "../service/question.service";
import { asyncHandler } from "../utils/asyncHandler";

const questionService = new QuestionService();

class QuestionController {
  createQuestion = asyncHandler(async (req: Request, res: Response) => {
    const result = await questionService.createQuestionWithOptions(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  });

  getQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await questionService.getQuestions();

    res.status(200).json({
      success: true,
      data: questions,
    });
  });

  updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id), 10);
    const result = await questionService.updateQuestion(id, req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  });

  deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id), 10);
    const result = await questionService.deleteQuestion(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  });
}

export default new QuestionController();