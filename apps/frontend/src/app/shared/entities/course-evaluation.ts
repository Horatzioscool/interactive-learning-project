export interface CourseEvaluation {
  id: string;
  courseId: string;
  questions: QuestionDetails[];
}

interface QuestionDetails {
  questionText: string;
  correctAnswer: string;
}
