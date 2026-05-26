import { AssessmentRepository } from "../repositories/assessment.repository";

const assessmentRepository = new AssessmentRepository();

export class AssessmentService {
  async submitAssessment(body: {
    name: string;
    emailId: string;
    phoneNumber: string;
    answers: { questionId: number; optionId: number; mark: number }[];
  }) {
    const { name, emailId, phoneNumber, answers } = body;

    if (!name?.trim() || !emailId?.trim() || !phoneNumber?.trim()) {
      throw new Error("Name, email, and phone number are required");
    }

    if (!answers?.length) {
      throw new Error("Answers are required");
    }

    const totalScore = answers.reduce((sum, a) => sum + (a.mark ?? 0), 0);

    return await assessmentRepository.createSubmission({
      name: name.trim(),
      emailId: emailId.trim(),
      phoneNumber: phoneNumber.trim(),
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
