import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AddAttachmentDto, Attachment } from '../entities/attachment';
import { finalize, Observable } from 'rxjs';
import { Collections } from '../collections';
import { getAllFromCollection } from './collection-helpers';
import { AuthService } from './auth.service';
import { EntityService, EntityServiceFactory } from './entity.service';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  constructor(
    private fireStorage: AngularFireStorage,
    private authService: AuthService,
    entityServiceFactory: EntityServiceFactory
  ) {
    this.attachmentService = entityServiceFactory.create(
      Collections.Attachement
    );
  }
  private attachmentService: EntityService<Attachment>;

  private basePath = '/34444444s';

  public create(attachment: Attachment, file: File) {
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
            attachment.downloadURL = downloadURL;
            this.attachmentService.add(attachment);
          });
        })
      )
      .subscribe();
  }

  public getAll(): Observable<Attachment[]> {
    return this.attachmentService.getAll();
  }
}
