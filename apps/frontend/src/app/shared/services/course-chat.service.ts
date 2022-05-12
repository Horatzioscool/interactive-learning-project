import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, mergeMap, zip, toArray, of } from 'rxjs';
import { Collections } from '../entities/collections';
import { CourseChat } from '../entities/course-chat';
import { getFirstFromQuery, getFromQuery } from './collection-helpers';
import { User } from './user';

export interface CourseChatWithCourseeName {
  chat: CourseChat;
  courseeName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseChatService {
  constructor(private firestore: AngularFirestore) {}

  public getChatInfoForCourse(
    courseId: string,
    courseeId: string
  ): Observable<CourseChat | undefined> {
    const courseChat = getFirstFromQuery(
      this.firestore
        .collection<CourseChat>(Collections.CourseChat)
        .ref.where('courseId', '==', courseId)
        .where('courseeId', '==', courseeId)
    );

    return courseChat.pipe(
      map((ch) => {
        ch?.messages.forEach(
          (m) => (m.sendTime = (m.sendTime as any).toDate())
        );
        return ch;
      })
    );
  }

  public getUsername(authorId: string): Observable<string> {
    return getFirstFromQuery(
      this.firestore.collection<User>('users').ref.where('uid', '==', authorId)
    ).pipe(
      map((u) => {
        if (!u) throw new Error('User with id not found');
        return u?.displayName || u?.email || 'Student';
      })
    );
  }

  public getChatsForUser(
    userId: string
  ): Observable<CourseChatWithCourseeName[]> {
    return getFromQuery(
      this.firestore
        .collection<CourseChat>(Collections.CourseChat)
        .ref.where('authorId', '==', userId)
    )
      .pipe(mergeMap((ch) => ch))
      .pipe(
        map((ch) => {
          ch?.messages.forEach(
            (m) => (m.sendTime = (m.sendTime as any).toDate())
          );
          return ch;
        })
      )
      .pipe(
        mergeMap((ch) => {
          return this.getUsername(ch.courseeId as string).pipe(
            map((u) => {
              return {
                chat: ch,
                courseeName: u,
              } as CourseChatWithCourseeName;
            })
          );
        })
      )
      .pipe(toArray());
  }
}
