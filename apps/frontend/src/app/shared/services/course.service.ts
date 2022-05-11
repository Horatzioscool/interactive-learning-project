import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Collections } from '../entities/collections';
import { Course } from '../entities/course';
import { CourseChapter } from '../entities/course-chapter';
import { EntityService, EntityServiceFactory } from './entity.service';
import { CourseeProgress } from '../entities/coursee-progress';
import {
  Observable,
  from,
  map,
  mergeMap,
  concatMap,
  pluck,
  zip,
  toArray,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseService: EntityService<Course>;
  private chapterService: EntityService<CourseChapter>;
  constructor(
    entityServiceFactory: EntityServiceFactory,
    private firestore: AngularFirestore
  ) {
    this.courseService = entityServiceFactory.create(Collections.Course);
    this.chapterService = entityServiceFactory.create(
      Collections.CourseChapter
    );
  }

  public create(course: Course, chapters: CourseChapter[]) {
    for (const chapter of chapters) {
      this.chapterService.add(chapter);
    }
    this.courseService.add(course);
  }

  public getProgress(
    courseId: string,
    courseeId: string
  ): Observable<CourseeProgress | undefined> {
    function mapDoc(
      doc: QueryDocumentSnapshot<CourseeProgress>
    ): CourseeProgress {
      return {
        ...doc.data(),
      } as CourseeProgress;
    }

    return from(
      this.firestore
        .collection<CourseeProgress>(Collections.CourseeProgress)
        .ref.where('courseId', '==', courseId)
        .where('courseeId', '==', courseeId)
        .get()
    ).pipe(
      map((s) =>
        s.empty || s.docs.length === 0 ? undefined : mapDoc(s.docs[0])
      )
    );
  }

  public getCoursesAndChapters(
    courseeId: string
  ): Observable<[Course, CourseChapter][]> {
    const coursesAndChapters = this.getCourseProgresses(courseeId)
      .pipe(mergeMap((p) => p))
      .pipe(mergeMap((p) => this.getCourseAndChapter(p)))
      .pipe(toArray());

    return coursesAndChapters;
  }

  private getCourseAndChapter(
    progress: CourseeProgress
  ): Observable<[Course, CourseChapter]> {
    return zip(
      this.courseService.getOneById(progress.courseId as string),
      this.chapterService.getOneById(progress.currentChapterId as string)
    );
  }

  private getCourseProgresses(
    courseeId: string
  ): Observable<CourseeProgress[]> {
    function mapDoc(
      doc: QueryDocumentSnapshot<CourseeProgress>
    ): CourseeProgress {
      return {
        ...doc.data(),
      } as CourseeProgress;
    }
    return from(
      this.firestore
        .collection<CourseeProgress>(Collections.CourseeProgress)
        .ref.where('courseeId', '==', courseeId)
        .get()
    ).pipe(
      map((s) => (s.empty || s.docs.length === 0 ? [] : s.docs.map(mapDoc)))
    );
  }
}
