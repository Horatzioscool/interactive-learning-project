import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '../../shared/entities/attachment';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.html',
  styleUrls: ['./Document-preview.scss'],
})
export class DocumentPreviewComponent implements OnInit {
  @Input('attachment') public attachment!: Attachment;

  public isImage = false;
  public isVideo = false;
  public isDocument = false;

  constructor(public router: Router) {}
  ngOnInit(): void {
    this.isImage =
      this.attachment.fileName?.endsWith('jpeg') ||
      this.attachment.fileName?.endsWith('png') ||
      false;
    this.isDocument =
      this.attachment.fileName?.endsWith('.pdf') ||
      this.attachment.fileName?.endsWith('.doc') ||
      false;
    this.isVideo = this.attachment.isVideo || false;
  }

  public linkToAttachment() {
    if (this.attachment.downloadURL)
      window.open(this.attachment.downloadURL, '_blank');
  }
}
