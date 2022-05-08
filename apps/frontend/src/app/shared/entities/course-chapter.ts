import { Entity } from './entity';

export class CourseChapter extends Entity {
  courseId?: string;
  title?: string;
  videoAttachmentId?: string;
  attachmentIds?: string[];
}
