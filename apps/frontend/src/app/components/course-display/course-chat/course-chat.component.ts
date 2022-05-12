import { Component, Input, OnInit } from '@angular/core';
import { Collections } from 'src/app/shared/entities/collections';
import { Course } from 'src/app/shared/entities/course';
import { ChatMessage, CourseChat } from 'src/app/shared/entities/course-chat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseChatService } from 'src/app/shared/services/course-chat.service';
import {
  EntityService,
  EntityServiceFactory,
} from 'src/app/shared/services/entity.service';

@Component({
  selector: 'app-course-chat',
  templateUrl: './course-chat.component.html',
  styleUrls: ['./course-chat.component.scss'],
})
export class CourseChatComponent implements OnInit {
  @Input('course') public course!: Course;

  public isChatStarted = false;
  public authorName: string = '';
  public courseChat: CourseChat = new CourseChat();

  private courseChatEntityService: EntityService<CourseChat>;
  constructor(
    private courseChatService: CourseChatService,
    entityServiceFactory: EntityServiceFactory,
    private authService: AuthService
  ) {
    this.courseChatEntityService = entityServiceFactory.create(
      Collections.CourseChat
    );
  }

  ngOnInit(): void {
    this.courseChatService
      .getChatInfoForCourse(this.course.id)
      .subscribe((ci) => {
        if (!ci) this.isChatStarted = false;
      });

    if (!this.course.authorId) throw new Error('AuthorId was undefined');
    this.courseChatService
      .getUsername(this.course.authorId)
      .subscribe((n) => (this.authorName = n));
  }

  public startChat() {
    this.courseChat.courseeId = this.authService.userData.uid;
    this.courseChat.courseId = this.course.id;
    this.courseChat.authorId = this.course.authorId;
    this.courseChatEntityService.add(this.courseChat);
    this.isChatStarted = true;
  }

  public getMessages() {
    return [...this.courseChat.messages]
      .sort((m1, m2) => m1.sendTime.getTime() - m2.sendTime.getTime())
      .map((m) => ({
        text: m.text,
        isSender: m.userId == this.authService.userData.uid,
      }));
  }

  public newMessageText = '';

  public sendMessage() {
    const msg: ChatMessage = {
      text: this.newMessageText,
      sendTime: new Date(),
      userId: this.authService.userData.uid,
    };

    this.courseChat.messages = [...this.courseChat.messages, msg];
    this.courseChatEntityService.update(this.courseChat);
  }
}
