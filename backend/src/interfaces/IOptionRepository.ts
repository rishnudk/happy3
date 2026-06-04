import { Option } from "@prisma/client";

export interface IOptionRepository {
  createOption(data: {
    optionText: string;
    mark: number;
    questionId: number;
  }): Promise<Option>;
  
  createManyOptions(
    questionId: number,
    options: { optionText: string; mark: number }[]
  ): Promise<{ count: number }>;
  
  deleteOptionsByQuestionId(questionId: number): Promise<{ count: number }>;
  
  deleteOption(id: number): Promise<Option>;
}
