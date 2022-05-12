import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Collections } from '../entities/collections';
import { CourseChat } from '../entities/course-chat';
import {
  getFirstFromQuery,
  getFromCollection,
  getFromQuery,
} from './collection-helpers';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class CourseChatService {
  constructor(private firestore: AngularFirestore) {}

  public getChatInfoForCourse(
    courseId: string
  ): Observable<CourseChat | undefined> {
    const courseChat = getFirstFromQuery(
      this.firestore
        .collection<CourseChat>(Collections.CourseChat)
        .ref.where('courseId', '==', courseId)
    );

    return courseChat;
  }

  public getUsername(authorId: string): Observable<string> {
    return getFirstFromQuery(
      this.firestore.collection<User>('users').ref.where('uid', '==', authorId)
    ).pipe(
      map((u) => {
        if (!u) throw new Error('User with id not found');
        return u.displayName;
      })
    );
  }

  public getChatsForUser(userId: string): Observable<CourseChat[]> {
    return getFromQuery(
      this.firestore
        .collection<CourseChat>(Collections.CourseChat)
        .ref.where('authorId', '==', userId)
    );
  }
}
