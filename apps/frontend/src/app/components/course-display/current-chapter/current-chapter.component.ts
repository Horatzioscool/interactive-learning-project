import {
  EntityService,
  EntityServiceFactory,
} from './../../../shared/services/entity.service';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';
import { Attachment } from 'src/app/shared/entities/attachment';
import { Collections } from 'src/app/shared/entities/collections';

@Component({
  selector: 'app-current-chapter',
  templateUrl: './current-chapter.component.html',
  styleUrls: ['./current-chapter.component.scss'],
})
export class CurrentChapterComponent implements OnInit, OnChanges {
  @Input('currentChapter') chapter!: CourseChapter;

  public attachmentsService: EntityService<Attachment>;
  constructor(entityServiceFactory: EntityServiceFactory) {
    this.attachmentsService = entityServiceFactory.create(
      Collections.Attachement
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chapter']) {
      if (!this.chapter.videoAttachmentId)
        throw new Error('videoAttachmentId was null');
      this.attachmentsService
        .getOneById(this.chapter.videoAttachmentId)
        .subscribe((a) => {
          this.videoAttachment = a;
          if (!this.videoAttachment.downloadURL)
            throw new Error('Video had no url');
        });

      if (this.chapter.attachmentIds) {
        this.attachmentsService
          .getManyById(this.chapter.attachmentIds)
          .subscribe((a) => {
            this.Attachments = a;
          });
      } else {
        this.Attachments = [];
      }
    }
  }

  public videoAttachment: Attachment = Attachment.Empty();

  public Attachments: Attachment[] = [];
  public videoUrl: string = '';

  ngOnInit(): void {}
}
