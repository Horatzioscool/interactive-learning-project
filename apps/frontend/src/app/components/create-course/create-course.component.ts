import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/entities/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { ChapterListEditorComponent } from './chapter-list-editor/chapter-list-editor.component';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  @ViewChild('chapterList') chapterList!: ChapterListEditorComponent;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {}

  public newCourse: Course = new Course();

  public createCourse() {
    let isOk: boolean = false;
    try {
      const chapters = this.chapterList.chapters;
      chapters.forEach((c) => (c.courseId = this.newCourse.id));
      this.newCourse.chapterIds = chapters.map((c) => c.id);
      this.courseService.create(this.newCourse, chapters);
      isOk = true;
    } catch (e) {
      isOk = false;
      alert(e);
    }
    if (isOk) {
      this.router.navigate(['course', this.newCourse.id.toString()]);
    }
  }
}
