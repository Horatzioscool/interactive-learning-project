import { Entity } from './entity';

export class CourseChat extends Entity {
  courseId?: string;
  authorId?: string;
  courseeId?: string;
  messages: ChatMessage[] = [];
}

export interface ChatMessage {
  userId?: string;
  text?: string;
  sendTime: Date;
}
