export interface Media {
  courseId: string;
  name: string;
}

export interface VideoMedia extends Media {
  type: 'video';
  url: string;
}

export interface ImageMedia extends Media {
  type: 'image';
  imageId: string;
  content: Buffer;
}
