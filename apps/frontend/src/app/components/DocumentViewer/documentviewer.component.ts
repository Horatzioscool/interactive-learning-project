import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {NgxDocViewerComponent,viewerType} from "ngx-doc-viewer";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CourseChapter} from "../../shared/entities/course-chapter";
import {Attachment} from "../../shared/entities/attachment";
import {EntityService, EntityServiceFactory} from "../../shared/services/entity.service";
import {Collections} from "../../shared/entities/collections";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Observable} from "rxjs";
import {SafePipe} from "./SafePipe";

@Component({
  selector: 'app-document-viewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentViewerComponent implements OnInit{
  @Input('attachment') public attachment!: Attachment;

  private attachmentService:EntityService<Attachment>


  att={
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
attachments=[this.att,this.att2]
  public attach={downloadURL: "https://firebasestorage.googleapis.com/v0/b/interactivelearning-4e45d.appspot.com/o/attachments%2FkBs0o0wDgZZsN8VfnnZPoSz2Z8y2%2Fgraphviz.png?alt=media&token=98bad6d7-9f28-4ea8-91d5-4fd93d1ac910",
    fileName: "graphviz.png",
    id: "woah",
    name: "A really cool upload",
    isVideo:false}
  constructor(
    factory: EntityServiceFactory
  ) { this.attachmentService=factory.create(Collections.Attachement)}

  ngOnInit(): void {
this.attachmentService.add(this.att);
    this.attachmentService.add(this.att2)
    this.attachmentService.add(this.attach)

  }





}
