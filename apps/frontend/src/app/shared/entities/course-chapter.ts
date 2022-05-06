import { Entity } from './entity';

export class CourseChapter extends Entity {
  courseId?: string;
  title?: string;
  attachmentIds?: string[];
}

export interface AddChapterDto {
  courseId: string;
  title: string;
  attachmentIds: string[];
}
