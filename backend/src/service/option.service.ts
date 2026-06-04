// services/option.service.ts

import { QuestionRepository } from "../repositories/question.repository";
import { OptionRepository } from "../repositories/option.repository";

const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();

export class OptionService {

  private async assertQuestionExists(questionId: number) {
    const question = await questionRepository.getQuestionById(questionId);

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

    await optionRepository.deleteOptionsByQuestionId(questionId);

    if (options?.length) {
      await optionRepository.createManyOptions(questionId, options);
    }

    return await questionRepository.getQuestionById(questionId);
  }

  async deleteOptionsByQuestionId(questionId: number) {
    await this.assertQuestionExists(questionId);

    return await optionRepository.deleteOptionsByQuestionId(questionId);
  }
}
