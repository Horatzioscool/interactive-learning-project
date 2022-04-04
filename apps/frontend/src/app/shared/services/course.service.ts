import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Course } from '../entities/course';

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

  public addCourse(course: Course) {
    return this.firestore.collection<Course>('courses').add(course);
  }
}
