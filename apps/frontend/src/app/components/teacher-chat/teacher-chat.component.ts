import { Component, OnInit } from '@angular/core';
import { CourseChat } from 'src/app/shared/entities/course-chat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseChatService } from '../../shared/services/course-chat.service';

@Component({
  selector: 'app-teacher-chat',
  templateUrl: './teacher-chat.component.html',
  styleUrls: ['./teacher-chat.component.scss'],
})
export class TeacherChatComponent implements OnInit {
  public chats: CourseChat[] = [];
  constructor(
    private authService: AuthService,
    private courseChatService: CourseChatService
  ) {}

  ngOnInit(): void {
    // this.authService.userData;
    // this.courseChatService.getChatsForUser*
  }
}
