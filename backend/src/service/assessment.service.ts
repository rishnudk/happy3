import { IAssessmentRepository } from "../interfaces/IAssessmentRepository";
import { SubmitAssessmentDTO, AssessmentResponseSchema } from "../dtos/assessment.dto";
import { NotFoundError } from "../utils/errors";

export class AssessmentService {
  constructor(private readonly assessmentRepository: IAssessmentRepository) {}
  async submitAssessment(body: SubmitAssessmentDTO) {
    const { name, emailId, phoneNumber, answers } = body;

    const totalScore = answers.reduce((sum, a) => sum + (a.mark ?? 0), 0);

    const result = await this.assessmentRepository.createSubmission({
      name,
      emailId,
      phoneNumber,
      totalScore,
      answers: {
        create: answers.map((a: any) => ({
          questionId: a.questionId,
          optionId: a.optionId,
          mark: a.mark,
        })),
      },
    });
    return AssessmentResponseSchema.parse(result);
  }

  async getAllSubmissions() {
    const results = await this.assessmentRepository.getAllSubmissions();
    return results.map(r => AssessmentResponseSchema.parse(r));
  }

  async getSubmissionById(id: number) {
    const submission = await this.assessmentRepository.getSubmissionById(id);
    if (!submission) {
      throw new NotFoundError("Submission not found");
    }
    return AssessmentResponseSchema.parse(submission);
  }
}
