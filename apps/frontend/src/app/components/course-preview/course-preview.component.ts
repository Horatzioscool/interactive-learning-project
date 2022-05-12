import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Collections } from 'src/app/shared/entities/collections';
import { Course } from 'src/app/shared/entities/course';
import {
  EntityService,
  EntityServiceFactory,
} from '../../shared/services/entity.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent implements OnInit {
  @Input('course') public course!: Course;
  @Input('courseName') public courseName!: string;
  private courseService: EntityService<Course>;
 
  constructor(public router: Router,factory: EntityServiceFactory, public authService: AuthService) {
    this.courseService = factory.create(Collections.Course);
  }
 
  ngOnInit(): void {
    
    this.courseService.getAll().subscribe((c) => (this.courses = c));
    
  }
  public goToCourse() {
    this.router.navigate(['course', this.course.id.toString()]);
  }
  public courses: Course[] = [];
}
