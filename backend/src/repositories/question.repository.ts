// repositories/question.repository.ts

import { prisma } from "../config/db.config";

export class QuestionRepository {

  async createQuestion(data: {
    questionNo: number;
    category: string;
    questionText: string;
  }) {
    return await prisma.question.create({
      data,
    });
  }

  async getAllQuestions() {
    return await prisma.question.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        options: true,
      },
      orderBy: {
        questionNo: "asc",
      },
    });
  }

  async getQuestionById(id: number) {
    return await prisma.question.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });
  }

  async updateQuestion(
    id: number,
    data: {
      questionNo?: number;
      category?: string;
      questionText?: string;
    }
  ) {
    return await prisma.question.update({
      where: { id },
      data,
    });
  }

  async deleteQuestion(id: number) {
    return await prisma.question.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
  