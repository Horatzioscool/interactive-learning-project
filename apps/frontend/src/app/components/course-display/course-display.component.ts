import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collections } from 'src/app/shared/entities/collections';
import { Course } from 'src/app/shared/entities/course';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';
import { CourseeProgress } from 'src/app/shared/entities/coursee-progress';
import {
  EntityService,
  EntityServiceFactory,
} from '../../shared/services/entity.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { Entity } from 'src/app/shared/entities/entity';

@Component({
  selector: 'app-course-display',
  templateUrl: './course-display.component.html',
  styleUrls: ['./course-display.component.scss'],
})
export class CourseDisplayComponent implements OnInit {
  private courseEntityService: EntityService<Course>;
  private chapterService: EntityService<CourseChapter>;
  private courseeProgressService: EntityService<CourseeProgress>;
  stylepcard = { height: '100%', width: '100%' };
  constructor(
    private activatedRoute: ActivatedRoute,
    entityServiceFactory: EntityServiceFactory,
    private authService: AuthService,
    private courseService: CourseService
  ) {
    this.courseEntityService = entityServiceFactory.create(Collections.Course);
    this.chapterService = entityServiceFactory.create(
      Collections.CourseChapter
    );
    this.courseeProgressService = entityServiceFactory.create(
      Collections.CourseeProgress
    );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      const courseId = p.get('id');
      if (!courseId) {
        throw new Error('courseId was null');
      }
      this.courseEntityService.getOneById(courseId).subscribe((c) => {
        this.isEmpty = false;
        this.course = c;
        if (!this.course.chapterIds) throw new Error('chapterIds was null');
        this.chapterService
          .getManyById(this.course.chapterIds)
          .subscribe((chs) => {
            this.chapters = chs;
            this.chapters.sort((c1, c2) => c1.chapterNumber - c2.chapterNumber);
          });

        this.courseService
          .getProgress(this.course.id, this.authService.userData.uid)
          .subscribe((p) => (this.progress = p));
      });
    });
  }

  public isEmpty = true;
  public course: Course = Entity.Empty();
  public chapters: CourseChapter[] = [];
  public progress?: CourseeProgress;

  public beginCourse() {
    const newProgress = new CourseeProgress();
    newProgress.courseId = this.course.id;
    newProgress.courseeId = this.authService.userData.uid;
    newProgress.currentChapterId = this.chapters[0].id;
    newProgress.isCourseComplete = false;
    this.courseeProgressService.add(newProgress);
    this.progress = newProgress;
  }
  public getCurrentChapter() {
    if (!this.progress) throw new Error('Progress was undefined!');
    const id = this.progress.currentChapterId;
    const chapter = this.chapters.find((c) => c.id == id);
    if (!chapter) throw new Error('Current chapter not found!');
    return chapter;
  }

  public nextChapter() {
    if (!this.progress) throw new Error('Progress was undefined!');
    const id = this.progress?.currentChapterId;
    const index = this.chapters.findIndex((c) => c.id == id);
    const nextIndex = index + 1;
    if (nextIndex == this.chapters.length) {
      this.progress.isCourseComplete = true;
    } else {
      this.progress.currentChapterId = this.chapters[nextIndex].id;
      this.courseeProgressService.update(this.progress);
    }
  }
  public previousChapter() {
    if (!this.progress) throw new Error('Progress was undefined!');
    const id = this.progress.currentChapterId;
    const index = this.chapters.findIndex((c) => c.id == id);
    const nextIndex = index - 1;
    if (nextIndex < 0) return;

    this.progress.currentChapterId = this.chapters[nextIndex].id;
    this.courseeProgressService.update(this.progress);
  }

  public takeQuiz() {
    if (this.course.quizUrl) window.location.href = this.course.quizUrl;
  }
}
