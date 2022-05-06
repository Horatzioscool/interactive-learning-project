export interface Attachment {
  name: string;
  fileName: string;
  downloadURL: string;
}

export interface AddAttachmentDto {
  name: string;
  file: File;
}
