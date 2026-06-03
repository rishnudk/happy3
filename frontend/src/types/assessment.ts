export interface Option {
  id: number;
  optionText: string;
  mark: number;
  questionId: number;
  createdAt?: string;
}

export interface Question {
  id: number;
  questionNo: number;
  category: string;
  questionText: string;
  isDeleted: boolean;
  options: Option[];
  createdAt?: string;
  updatedAt?: string;
}

/** Shape sent to POST /api/questions/createQuestion */
export interface CreateQuestionPayload {
  questionNo: number;
  category: string;
  questionText: string;
  options: { optionText: string; mark: number }[];
}

/** Shape sent to PUT /api/questions/updateQuestion/:id */
export interface UpdateQuestionPayload {
  questionNo?: number;
  category?: string;
  questionText?: string;
}

/** Shape sent to PUT /api/options/updateOptions/:questionId */
export interface UpdateOptionsPayload {
  options: { optionText: string; mark: number }[];
}
