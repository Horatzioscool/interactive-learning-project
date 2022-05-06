import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Course, AddCourseDto } from '../entities/course';
import { getAllFromCollection } from './collection-helpers';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private firestore: AngularFirestore) {}

  public getCourses(): Observable<Course[]> {
    return getAllFromCollection<Course>(
      this.firestore.collection<Course>('courses')
    );
  }

  public addCourse(course: AddCourseDto) {
    return this.firestore.collection<AddCourseDto>('courses').add(course);
  }
}
