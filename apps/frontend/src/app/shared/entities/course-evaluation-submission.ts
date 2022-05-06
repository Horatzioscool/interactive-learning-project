export interface CourseEvaluationSubmission {
  id: string;
  courseeId: string;
  answers: AnswerDetails[];
}

export interface AnswerDetails {
  text: string;
  isCorrect: boolean;
}
