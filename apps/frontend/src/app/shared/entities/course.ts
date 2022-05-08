import { Entity } from './entity';

export class Course extends Entity {
  name?: string;
  description?: string;

  authorId?: string;
  chapterIds?: string[];

  quizUrl?: string;
}
