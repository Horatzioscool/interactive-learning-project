import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Entity } from '../entities/entity';
import { getAllFromCollection } from './collection-helpers';

@Injectable({
  providedIn: 'root',
})
export class EntityServiceFactory {
  constructor(private firestore: AngularFirestore) {}

  public create<T extends Entity>(collectionName: string): EntityService<T> {
    return new EntityService(collectionName, this.firestore);
  }
}

export class EntityService<T extends Entity> {
  constructor(
    private collectionName: string,
    private firestore: AngularFirestore
  ) {}

  public get(): Observable<T[]> {
    return getAllFromCollection<T>(
      this.firestore.collection<T>(this.collectionName)
    );
  }

  public add(instance: T) {
    return this.firestore
      .collection<T>(this.collectionName)
      .doc(instance.id)
      .set({
        ...instance,
      });
  }
}
