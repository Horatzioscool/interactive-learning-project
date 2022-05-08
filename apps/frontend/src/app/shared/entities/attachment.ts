import { Entity } from './entity';
export class Attachment extends Entity {
  name?: string;
  fileName?: string;
  downloadURL?: string;
  isVideo: boolean = false;

  public static override Empty() {
    return super.Empty() as Attachment;
  }
}
export interface AddAttachmentDto {
  name: string;
  file: File;
}
