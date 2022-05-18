import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Attachment } from 'src/app/shared/entities/attachment';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';

interface AttachmentInfo {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
})
export class CreateChapterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public newChapter: CourseChapter = new CourseChapter();
  public newChapterTitle: string = '';
  public newChapterDescription: string = '';
  public newChapterQuizUrl: string = '';
  public videoAttachment?: AttachmentInfo;
  public attachments: AttachmentInfo[] = [];

  public videoAttached(attachment: Attachment) {
    if (!attachment.id || !attachment.name)
      throw new Error("Attachment didn't have id or name");
    this.videoAttachment = { id: attachment.id, name: attachment.name };
  }

  public addedAttachment(attachment: Attachment) {
    if (!attachment.id || !attachment.name) {
      throw new Error('Attachment did not have id or name');
    }
    this.attachments = [
      ...this.attachments,
      {
        id: attachment.id,
        name: attachment.name,
      },
    ];
  }

  public removeAttachment(attachment: Attachment) {
    this.attachments = this.attachments.filter((a) => a != attachment);
  }

  @Output('created') createdEvent: EventEmitter<CourseChapter> =
    new EventEmitter();

  public created() {
    this.newChapter.title = this.newChapterTitle;
    this.newChapter.description = this.newChapterDescription;
    this.newChapter.quizUrl = this.newChapterQuizUrl;
    this.newChapter.videoAttachmentId = this.videoAttachment?.id;
    this.newChapter.attachmentIds = this.attachments.map((a) => a.id);
    this.createdEvent.emit(this.newChapter);
    this.newChapter = new CourseChapter();
  }
}
