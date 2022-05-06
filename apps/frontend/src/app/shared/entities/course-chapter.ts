export interface CourseChapter {
  id: string;
  courseId: string;
  title: string;
  attachmentIds: string[];
}

export interface AddChapterDto {
  courseId: string;
  title: string;
  attachmentIds: string[];
}
