import { Entity } from './entity';
export class Attachment extends Entity {
  name?: string;
  fileName?: string;
  downloadURL?: string;
}
export interface AddAttachmentDto {
  name: string;
  file: File;
}
