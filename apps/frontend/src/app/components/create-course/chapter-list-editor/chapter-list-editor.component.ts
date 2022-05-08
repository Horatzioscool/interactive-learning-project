import { Component, OnInit } from '@angular/core';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';

@Component({
  selector: 'app-chapter-list-editor',
  templateUrl: './chapter-list-editor.component.html',
  styleUrls: ['./chapter-list-editor.component.scss'],
})
export class ChapterListEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public chapters: CourseChapter[] = [];

  public addChapter(chapter: CourseChapter) {
    this.chapters = [...this.chapters, chapter];
  }

  public removeChapter(chapter: CourseChapter) {
    this.chapters = this.chapters.filter((c) => c != chapter);
  }
}
