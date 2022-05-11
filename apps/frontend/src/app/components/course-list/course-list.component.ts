import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/shared/entities/collections';
import { Course } from 'src/app/shared/entities/course';
import {
  EntityService,
  EntityServiceFactory,
} from '../../shared/services/entity.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  private courseService: EntityService<Course>;
  constructor(factory: EntityServiceFactory, public authService: AuthService) {
    this.courseService = factory.create(Collections.Course);
  }

  public isTeacher = false;

  ngOnInit(): void {
    this.courseService.getAll().subscribe((c) => (this.courses = c));
    this.authService.userRoles.subscribe((roles) => {
      this.isTeacher = !!roles.find((r) => r.role === 'teacher');
    });
  }

  public courses: Course[] = [];
}
