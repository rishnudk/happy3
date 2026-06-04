import { prisma } from "../config/db.config";
import { IAssessmentRepository } from "../interfaces/IAssessmentRepository";

export class AssessmentRepository implements IAssessmentRepository {
  async createSubmission(data: {
    name: string;
    emailId: string;
    phoneNumber: string;
    totalScore: number;
    answers: any;
  }) {
    return await prisma.assessmentSubmission.create({
      data,
    });
  }

  async getAllSubmissions() {
    return await prisma.assessmentSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getSubmissionById(id: number) {
    return await prisma.assessmentSubmission.findUnique({
      where: { id },
    });
  }
}
