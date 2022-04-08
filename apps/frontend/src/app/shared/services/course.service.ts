import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course, AddCourseDto } from '../entities/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private firestore: AngularFirestore) {}

  public getCourses(): Observable<Course[]> {
    return this.firestore
      .collection<Course>('courses')
      .snapshotChanges()
      .pipe(
        map((courses) =>
          courses.map(
            (c) =>
              ({
                ...c.payload.doc.data(),
              } as Course)
          )
        )
      );
  }

  public addCourse(course: AddCourseDto) {
    return this.firestore.collection<AddCourseDto>('courses').add(course);
  }
}
