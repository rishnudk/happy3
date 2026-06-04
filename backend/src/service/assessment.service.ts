import { AssessmentRepository } from "../repositories/assessment.repository";
import { SubmitAssessmentDTO } from "../dtos/assessment.dto";

const assessmentRepository = new AssessmentRepository();

export class AssessmentService {
  async submitAssessment(body: SubmitAssessmentDTO) {
    const { name, emailId, phoneNumber, answers } = body;

    const totalScore = answers.reduce((sum, a) => sum + (a.mark ?? 0), 0);

    return await assessmentRepository.createSubmission({
      name,
      emailId,
      phoneNumber,
      totalScore,
      answers,
    });
  }

  async getAllSubmissions() {
    return await assessmentRepository.getAllSubmissions();
  }

  async getSubmissionById(id: number) {
    return await assessmentRepository.getSubmissionById(id);
  }
}
