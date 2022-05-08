import {
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

const mapDoc = <T>(e: DocumentChangeAction<T>) => {
  return {
    id: e.payload.doc.id,
    ...e.payload.doc.data(),
  } as T;
};

export const getFromCollection = <T>(
  collection: AngularFirestoreCollection<T>
) => {
  return collection
    .snapshotChanges()
    .pipe(map((entities) => entities.map(mapDoc)));
};
