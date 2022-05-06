import { Entity } from './entity';

export class CourseEvaluation extends Entity {
  courseId?: string;
  questions?: QuestionDetails[];
}

interface QuestionDetails {
  questionText: string;
  correctAnswer: string;
}
