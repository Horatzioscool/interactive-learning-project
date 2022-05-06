import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Attachment } from 'src/app/shared/entities/attachment';
import { AttachmentsService } from 'src/app/shared/services/attachments.service';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.scss'],
})
export class AttachComponent implements OnInit {
  @ViewChild('op') overlayPanel!: OverlayPanel;

  constructor(private attachmentService: AttachmentsService) {}

  ngOnInit(): void {}

  public attachments: Attachment[] = [];
  public selectedAttachment!: Attachment;
  public openOverlay(event: any) {
    this.overlayPanel.show(event);
    this.loadAttachments();
  }

  public async loadAttachments() {
    this.attachmentService.getAll().subscribe((a) => (this.attachments = a));
  }

  public onSelectAttachment(event: any) {
    this.overlayPanel.hide();
  }

  public newAttachmentName: string = '';
  public onUpload(event: { files: File[] }) {
    const newFile = event.files[0];
    this.attachmentService.create({
      name: this.newAttachmentName || 'New Attachment',
      file: newFile,
    });
    this.overlayPanel.hide();
  }
}
