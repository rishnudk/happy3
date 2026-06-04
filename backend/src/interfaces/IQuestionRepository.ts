import { Question, Option } from "@prisma/client";

export interface IQuestionRepository {
  createQuestion(data: {
    questionNo: number;
    category: string;
    questionText: string;
  }): Promise<Question>;
  
  getAllQuestions(): Promise<(Question & { options: Option[] })[]>;
  
  getQuestionById(id: number): Promise<(Question & { options: Option[] }) | null>;
  
  updateQuestion(
    id: number,
    data: {
      questionNo?: number;
      category?: string;
      questionText?: string;
    }
  ): Promise<Question>;
  
  deleteQuestion(id: number): Promise<Question>;
}
