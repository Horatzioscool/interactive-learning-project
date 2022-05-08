import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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

  @Output('attached') attachedEvent: EventEmitter<Attachment> =
    new EventEmitter();

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

  private attached(attachment: Attachment) {
    this.attachedEvent.emit(attachment);
    this.overlayPanel.hide();
  }

  public onSelectAttachment(attachmentId: string) {
    const attachment = this.attachments.find((a) => a.id == attachmentId);
    if (!attachment) throw new Error('Unable to find attachment');
    this.attached(attachment);
  }

  public newAttachmentName: string = '';
  public onUpload(event: { files: File[] }) {
    const newFile = event.files[0];
    const newAttachment = new Attachment();
    newAttachment.name = this.newAttachmentName || 'New Attachment';
    this.attachmentService.create(newAttachment, newFile);
    this.attached(newAttachment);
  }
}
