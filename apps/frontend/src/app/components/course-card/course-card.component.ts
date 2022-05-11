import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/entities/course';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input('course') public course!: Course;
  @Input('courseChapter') public chapter!: CourseChapter;

  public courseProgress: number = 0;

  constructor(public router: Router) {}

  ngOnInit(): void {
    const count = this.course.chapterIds?.length || 1;
    const chapterIndex =
      this.course.chapterIds?.findIndex((id) => id === this.chapter.id) || 1;
    this.courseProgress = (100 * chapterIndex) / count;
  }

  public goToCourse() {
    this.router.navigate(['course', this.course.id.toString()]);
  }
}
