import { Entity } from './entity';

export class CourseChapter extends Entity {
  courseId?: string;
  title?: string;
  videoAttachmentId?: string;
  attachmentIds?: string[];
  description?: string;
  chapterNumber: number = 0;
  quizUrl?: string;
}
