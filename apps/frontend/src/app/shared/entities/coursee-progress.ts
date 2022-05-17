import { Entity } from './entity';
export class CourseeProgress extends Entity {
  courseId?: string;
  courseeId?: string;

  currentChapterId?: string;
  isCourseComplete: boolean = false;
}
