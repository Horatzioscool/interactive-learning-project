import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AddAttachmentDto, Attachment } from '../entities/attachment';
import { finalize, Observable } from 'rxjs';
import { Collections } from '../entities/collections';
import { getAllFromCollection } from './collection-helpers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private authService: AuthService
  ) {}

  private basePath = '/attachments';

  public create(attachment: AddAttachmentDto) {
    const { file, ...otherAttachmentFields } = attachment;
    const path = `${this.basePath}/${this.authService.userData.uid || 'misc'}/${
      file.name
    }`;
    const storageRef = this.fireStorage.ref(path);
    const uploadTask = this.fireStorage.upload(path, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.fireStore.collection<Attachment>(Collections.Attachement).add({
              ...otherAttachmentFields,
              fileName: file.name,
              downloadURL,
            } as Attachment);
          });
        })
      )
      .subscribe();
  }

  public getAll(): Observable<Attachment[]> {
    return getAllFromCollection<Attachment>(
      this.fireStore.collection<Attachment>(Collections.Attachement)
    );
  }

  public find(text: string): Observable<Attachment[]> {
    return getAllFromCollection<Attachment>(
      this.fireStore.collection<Attachment>(Collections.Attachement, (ref) =>
        ref.where('name', '>=', text).where('name', '<=', text + '~')
      )
    );
  }
}
