import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/entities/course';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';
import { CourseService } from 'src/app/shared/services/course.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public courseService: CourseService
  ) {}

  public isAdmin = false;

  ngOnInit(): void {
    this.authService.user.subscribe((u) => {
      const userId = u.uid;
      if (!userId) throw new Error('User Id was null');
      this.courseService
        .getCoursesAndChapters(userId)
        .subscribe((c) => (this.coursesAndChapters = c));
    });
  }

  public coursesAndChapters: [Course, CourseChapter][] = [];
}
