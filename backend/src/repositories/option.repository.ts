// repositories/option.repository.ts

import { prisma } from "../config/db.config";
import { IOptionRepository } from "../interfaces/IOptionRepository";

export class OptionRepository implements IOptionRepository {

  async createOption(data: {
    optionText: string;
    mark: number;
    questionId: number;
  }) {
    return await prisma.option.create({
      data,
    });
  }

  async createManyOptions(
    questionId: number,
    options: { optionText: string; mark: number }[]
  ) {
    if (!options.length) {
      return { count: 0 };
    }

    return await prisma.option.createMany({
      data: options.map((option) => ({
        optionText: option.optionText,
        mark: option.mark,
        questionId,
      })),
    });
  }

  async deleteOptionsByQuestionId(questionId: number) {
    return await prisma.option.deleteMany({
      where: { questionId },
    });
  }

  async deleteOption(id: number) {
    return await prisma.option.delete({
      where: { id },
    });
  }
}
