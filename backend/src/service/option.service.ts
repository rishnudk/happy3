// services/option.service.ts

import { IQuestionRepository } from "../interfaces/IQuestionRepository";
import { IOptionRepository } from "../interfaces/IOptionRepository";
import { QuestionResponseSchema } from "../dtos/question.dto";

export class OptionService {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly optionRepository: IOptionRepository
  ) {}

  private async assertQuestionExists(questionId: number) {
    const question = await this.questionRepository.getQuestionById(questionId);

    if (!question || question.isDeleted) {
      const { NotFoundError } = require("../utils/errors");
      throw new NotFoundError("Question not found");
    }

    return question;
  }

  async updateOptionsByQuestionId(
    questionId: number,
    options: { optionText: string; mark: number }[]
  ) {
    await this.assertQuestionExists(questionId);

    await this.optionRepository.deleteOptionsByQuestionId(questionId);

    if (options?.length) {
      await this.optionRepository.createManyOptions(questionId, options);
    }

    const result = await this.questionRepository.getQuestionById(questionId);
    return QuestionResponseSchema.parse(result);
  }

  async deleteOptionsByQuestionId(questionId: number) {
    await this.assertQuestionExists(questionId);

    return await this.optionRepository.deleteOptionsByQuestionId(questionId);
  }
}
