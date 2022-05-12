import {
  EntityService,
  EntityServiceFactory,
} from './../../../shared/services/entity.service';
import { Component, Input, OnInit } from '@angular/core';
import { CourseChapter } from 'src/app/shared/entities/course-chapter';
import { Attachment } from 'src/app/shared/entities/attachment';
import { Collections } from 'src/app/shared/entities/collections';
import { from, map } from 'rxjs';

@Component({
  selector: 'app-current-chapter',
  templateUrl: './current-chapter.component.html',
  styleUrls: ['./current-chapter.component.scss'],
})
export class CurrentChapterComponent implements OnInit {
  @Input('currentChapter') chapter!: CourseChapter;

  private attachmentsService: EntityService<Attachment>;
  constructor(entityServiceFactory: EntityServiceFactory) {
    this.attachmentsService = entityServiceFactory.create(
      Collections.Attachement
    );
  }

  public videoAttachment: Attachment = Attachment.Empty();
  public videoUrl: string = '';
  ngOnInit(): void {
    if (!this.chapter.videoAttachmentId)
      throw new Error('videoAttachmentId was null');
    this.attachmentsService
      .getOneById(this.chapter.videoAttachmentId)
      .subscribe((a) => {
        this.videoAttachment = a;
        if (!this.videoAttachment.downloadURL)
          throw new Error('Video had no url');
      });
  }
}
