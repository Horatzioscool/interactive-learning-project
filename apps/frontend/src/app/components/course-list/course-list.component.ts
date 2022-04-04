import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/entities/course';
import { CourseService } from '../../shared/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((c) => (this.courses = c));
  }

  public courses: Course[] = [];

  public newCourseName: string = '';

  public async addCourse() {
    await this.courseService.addCourse({ name: this.newCourseName });
  }
}
