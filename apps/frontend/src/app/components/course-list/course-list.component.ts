import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/shared/collections';
import { Course } from 'src/app/shared/entities/course';
import {
  EntityService,
  EntityServiceFactory,
} from '../../shared/services/entity.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  private courseService: EntityService<Course>;
  constructor(factory: EntityServiceFactory) {
    this.courseService = factory.create(Collections.Course);
  }

  ngOnInit(): void {
    this.courseService.getAll().subscribe((c) => (this.courses = c));
  }

  public courses: Course[] = [];

  public newCourseName: string = '';

  public async addCourse() {
    const course = new Course();
    course.name = this.newCourseName;
    await this.courseService.add(course);
  }
}
