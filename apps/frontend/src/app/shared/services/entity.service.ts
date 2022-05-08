import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentSnapshotExists,
} from '@angular/fire/compat/firestore';
import { filter, map, Observable, from } from 'rxjs';
import { Entity } from '../entities/entity';
import { getFromCollection } from './collection-helpers';

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

  public getAll(): Observable<T[]> {
    return getFromCollection<T>(
      this.firestore.collection<T>(this.collectionName)
    );
  }

  public getOneById(id: string): Observable<T> {
    function mapDoc(d: DocumentSnapshotExists<T>): T {
      return {
        ...d.data(),
      } as T;
    }

    return this.firestore
      .collection<T>(this.collectionName)
      .doc(id)
      .get()
      .pipe(filter((d) => d.exists))
      .pipe(map((d) => mapDoc(d as DocumentSnapshotExists<T>)));
  }

  public getManyById(ids: string[]): Observable<T[]> {
    return from(
      this.firestore
        .collection<T>(this.collectionName)
        .ref.where('id', 'in', ids)
        .get()
    )
      .pipe(filter((s) => !s.empty))
      .pipe(map((s) => s.docs))
      .pipe(
        map((d) =>
          d.map(
            (doc) =>
              ({
                ...doc.data(),
              } as T)
          )
        )
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

  public update(instance: T) {
    return this.firestore
      .collection<T>(this.collectionName)
      .doc(instance.id)
      .set({
        ...instance,
      });
  }
}
