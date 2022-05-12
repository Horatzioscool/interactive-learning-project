import { Collections } from 'src/app/shared/entities/collections';
import { Component, OnInit } from '@angular/core';
import { ChatMessage, CourseChat } from 'src/app/shared/entities/course-chat';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  EntityService,
  EntityServiceFactory,
} from 'src/app/shared/services/entity.service';
import {
  CourseChatService,
  CourseChatWithCourseeName,
} from '../../shared/services/course-chat.service';

@Component({
  selector: 'app-teacher-chat',
  templateUrl: './teacher-chat.component.html',
  styleUrls: ['./teacher-chat.component.scss'],
})
export class TeacherChatComponent implements OnInit {
  public chats: CourseChatWithCourseeName[] = [];

  private courseChatEntityService: EntityService<CourseChat>;
  constructor(
    private authService: AuthService,
    private courseChatService: CourseChatService,
    entityServiceFactory: EntityServiceFactory
  ) {
    this.courseChatEntityService = entityServiceFactory.create(
      Collections.CourseChat
    );
  }

  ngOnInit(): void {
    this.courseChatService
      .getChatsForUser(this.authService.userData.uid)
      .subscribe((ch) => (this.chats = ch));
  }

  public getMessages(chat: CourseChatWithCourseeName) {
    return [...chat.chat.messages]
      .sort((m1, m2) => m1.sendTime.getTime() - m2.sendTime.getTime())
      .map((m) => ({
        isSender: this.authService.userData.uid === m.userId,
        text: m.text,
      }));
  }

  public newMessageText = '';

  public sendMessage(chat: CourseChatWithCourseeName) {
    const message: ChatMessage = {
      text: this.newMessageText,
      sendTime: new Date(),
      userId: this.authService.userData.uid,
    };

    const data = chat.chat;

    data.messages = [...data.messages, message];
    this.courseChatEntityService.update(data);
  }
}
