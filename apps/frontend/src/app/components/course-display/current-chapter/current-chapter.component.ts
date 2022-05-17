import {
  EntityService,
  EntityServiceFactory,
} from './../../../shared/services/entity.service';
import * as attachmentsData from "src/db.json";
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

  public attachmentsService: EntityService<Attachment>;
  constructor(entityServiceFactory: EntityServiceFactory) {
    this.attachmentsService = entityServiceFactory.create(
      Collections.Attachement
    );
  }

  public videoAttachment: Attachment = Attachment.Empty();
attachment={
  id: "4a7544ec-9697-37c9-c0ba-751e045dabf5",
  name: "attachment1",
  fileName: "yuhu1",
  downloadURL: "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf",
  isVideo:false
}
  att2={
    id: "blabla1",
    name: "attachment1",
    fileName: "yuhu1",
    downloadURL: "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2016/03/fall-trees-road-1.jpg?resize=1250,1120",
    isVideo:false
  }


  public attach={downloadURL: "https://firebasestorage.googleapis.com/v0/b/interactivelearning-4e45d.appspot.com/o/attachments%2FkBs0o0wDgZZsN8VfnnZPoSz2Z8y2%2Fgraphviz.png?alt=media&token=98bad6d7-9f28-4ea8-91d5-4fd93d1ac910",
    fileName: "graphviz.png",
    id: "woah",
    name: "A really cool upload",
    isVideo:false}

  public attachments:Attachment[]=[this.attachment,this.att2,this.attach]
public Attachments:Attachment[]=[];
public num=''
public at: Attachment[] | undefined;
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


     this.chapter.attachmentIds=[this.attachments[0].id,this.attachments[1].id,this.attachments[2].id]
      this.attachmentsService.add(this.attachment)
      this.attachmentsService.add(this.att2)



   if(this.chapter.attachmentIds){
this.attachmentsService.getManyById(this.chapter.attachmentIds).subscribe((a)=>{
  this.Attachments=a;
  this.num=a.length.toString()


});
    }

  }
}
