import { prisma } from "../config/db.config";

export class AssessmentRepository {
  async createSubmission(data: {
    name: string;
    emailId: string;
    phoneNumber: string;
    totalScore: number;
    answers: object;
  }) {
    return await prisma.assessmentSubmission.create({
      data,
    });
  }
}
