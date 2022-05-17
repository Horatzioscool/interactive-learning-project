import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Collections } from 'src/app/shared/entities/collections';
import { Course } from 'src/app/shared/entities/course';
import {
  EntityService,
  EntityServiceFactory,
} from '../../shared/services/entity.service';
import { AuthService } from '../../shared/services/auth.service';
import {DocumentViewerComponent} from "../DocumentViewer/documentviewer.component";
import {Attachment} from "../../shared/entities/attachment";

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.html',
  styleUrls: ['./Document-preview.scss'],
})
export class DocumentPreviewComponent implements OnInit {
  @Input('attachment') public attachment!: Attachment;

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
public attach={downloadURL: "https://firebasestorage.googleapis.com/v0/b/interactivelearning-4e45d.appspot.com/o/attachments%2FkBs0o0wDgZZsN8VfnnZPoSz2Z8y2%2Fgraphviz.png?alt=media&token=98bad6d7-9f28-4ea8-91d5-4fd93d1ac910",
  fileName: "graphviz.png",
  id: "woah",
  name: "A really cool upload",
  isVideo:false}
  private attachmentService:EntityService<Attachment>
  constructor(
    public router: Router,
    factory: EntityServiceFactory,
    public authService: AuthService
  ) { this.attachmentService=factory.create(Collections.Attachement)
  }

  ngOnInit(): void { this.attachmentService.add(this.att);
    this.attachmentService.add(this.att2);
  this.attachmentService.add(this.attach)}

  public goToDocument(){
    this.router.navigate(['document',this.attach.id]);
  }
public attachments:Attachment[]=[]
}
