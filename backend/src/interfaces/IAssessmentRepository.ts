import { AssessmentSubmission } from "@prisma/client";

export interface IAssessmentRepository {
  createSubmission(data: {
    name: string;
    emailId: string;
    phoneNumber: string;
    totalScore: number;
    answers: any;
  }): Promise<AssessmentSubmission>;

  getAllSubmissions(): Promise<AssessmentSubmission[]>;

  getSubmissionById(id: number): Promise<AssessmentSubmission | null>;
}
