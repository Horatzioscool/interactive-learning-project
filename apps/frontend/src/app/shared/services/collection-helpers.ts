import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

export const getAllFromCollection = <T>(
  collection: AngularFirestoreCollection<T>
) => {
  return collection.snapshotChanges().pipe(
    map((entities) =>
      entities.map(
        (e) =>
          ({
            ...e.payload.doc.data(),
          } as T)
      )
    )
  );
};
