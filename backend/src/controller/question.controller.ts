// controllers/question.controller.ts

import { Request, Response } from "express";
import { QuestionService } from "../service/question.service";

const questionService = new QuestionService();

class QuestionController {

  async createQuestion(req: Request, res: Response) {
    try {
      const result =
        await questionService.createQuestionWithOptions(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error in createQuestion:", error);
      res.status(500).json({
        success: false,
        message: "Question creation failed",
      });
    }
  }

  async getQuestions(req: Request, res: Response) {
    try {
      const questions =
        await questionService.getQuestions();

      res.status(200).json({
        success: true,
        data: questions,
      });
    } catch (error) {
      console.error("Error in getQuestions:", error);
      res.status(500).json({
        success: false,
      });
    }
  }

  async updateQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(String(req.params.id), 10);
      const result = await questionService.updateQuestion(id, req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error in updateQuestion:", error);
      res.status(500).json({
        success: false,
        message: "Question update failed",
      });
    }
  }

  async deleteQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(String(req.params.id), 10);
      const result = await questionService.deleteQuestion(id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error in deleteQuestion:", error);
      res.status(500).json({
        success: false,
        message: "Question deletion failed",
      });
    }
  }
}

export default new QuestionController();