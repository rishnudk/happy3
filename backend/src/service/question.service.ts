// services/question.service.ts

import { IQuestionRepository } from "../interfaces/IQuestionRepository";
import { IOptionRepository } from "../interfaces/IOptionRepository";
import { CreateQuestionDTO, UpdateQuestionDTO, QuestionResponseSchema } from "../dtos/question.dto";

export class QuestionService {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly optionRepository: IOptionRepository
  ) {}

  async createQuestionWithOptions(body: CreateQuestionDTO) {
    const { questionNo, category, questionText, options } = body;

    const question = await this.questionRepository.createQuestion({
      questionNo,
      category,
      questionText,
    });

    if (options?.length) {
      await this.optionRepository.createManyOptions(question.id, options);
    }

    const result = await this.questionRepository.getQuestionById(question.id);
    return QuestionResponseSchema.parse(result);
  }

  async getQuestions() {
    const results = await this.questionRepository.getAllQuestions();
    return results.map(q => QuestionResponseSchema.parse(q));
  }

  async updateQuestion(id: number, body: UpdateQuestionDTO) {
    const { questionNo, category, questionText } = body;

    await this.questionRepository.updateQuestion(id, {
      questionNo,
      category,
      questionText,
    });

    const result = await this.questionRepository.getQuestionById(id);
    return QuestionResponseSchema.parse(result);
  }

  async deleteQuestion(id: number) {
    const result = await this.questionRepository.deleteQuestion(id);
    return QuestionResponseSchema.parse(result);
  }
}
