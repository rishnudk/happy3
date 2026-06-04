// controllers/option.controller.ts

import { Request, Response } from "express";
import { OptionService } from "../service/option.service";
import { asyncHandler } from "../utils/asyncHandler";

const optionService = new OptionService();

class OptionController {
  updateOptions = asyncHandler(async (req: Request, res: Response) => {
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
  });

  deleteOptions = asyncHandler(async (req: Request, res: Response) => {
    const questionId = parseInt(String(req.params.questionId), 10);

    const result = await optionService.deleteOptionsByQuestionId(questionId);

    res.status(200).json({
      success: true,
      data: result,
    });
  });
}

export default new OptionController();
