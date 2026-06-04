// services/question.service.ts

import { QuestionRepository } from "../repositories/question.repository";
import { OptionRepository } from "../repositories/option.repository";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../dtos/question.dto";

const questionRepository = new QuestionRepository();
const optionRepository = new OptionRepository();

export class QuestionService {

  async createQuestionWithOptions(body: CreateQuestionDTO) {
    const { questionNo, category, questionText, options } = body;

    const question = await questionRepository.createQuestion({
      questionNo,
      category,
      questionText,
    });

    if (options?.length) {
      await optionRepository.createManyOptions(question.id, options);
    }

    return await questionRepository.getQuestionById(question.id);
  }

  async getQuestions() {
    return await questionRepository.getAllQuestions();
  }

  async updateQuestion(id: number, body: UpdateQuestionDTO) {
    const { questionNo, category, questionText } = body;

    await questionRepository.updateQuestion(id, {
      questionNo,
      category,
      questionText,
    });

    return await questionRepository.getQuestionById(id);
  }

  async deleteQuestion(id: number) {
    return await questionRepository.deleteQuestion(id);
  }
}
