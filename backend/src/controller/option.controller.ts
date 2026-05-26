// controllers/option.controller.ts

import { Request, Response } from "express";
import { OptionService } from "../service/option.service";

const optionService = new OptionService();

class OptionController {

  async updateOptions(req: Request, res: Response) {
    try {
      const questionId = parseInt(String(req.params.questionId), 10);
      const { options } = req.body;

      const result = await optionService.updateOptionsByQuestionId(
        questionId,
        options ?? []
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      const status = error.message === "Question not found" ? 404 : 500;

      res.status(status).json({
        success: false,
        message:
          error.message === "Question not found"
            ? error.message
            : "Options update failed",
      });
    }
  }

  async deleteOptions(req: Request, res: Response) {
    try {
      const questionId = parseInt(String(req.params.questionId), 10);

      const result = await optionService.deleteOptionsByQuestionId(questionId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      const status = error.message === "Question not found" ? 404 : 500;

      res.status(status).json({
        success: false,
        message:
          error.message === "Question not found"
            ? error.message
            : "Options deletion failed",
      });
    }
  }
}

export default new OptionController();
