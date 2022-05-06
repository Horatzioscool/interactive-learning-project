import { Entity } from './entity';
export class CourseEvaluationSubmission extends Entity {
  courseId?: string;
  courseeId?: string;
  answers?: AnswerDetails[];
}

export interface AnswerDetails {
  text: string;
  isCorrect: boolean;
}
