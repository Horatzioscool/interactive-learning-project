import {
  AngularFirestoreCollection,
  Query,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { map, from } from 'rxjs';

const mapDoc = <T>(e: QueryDocumentSnapshot<T>) => {
  return {
    id: e.id,
    ...e.data(),
  } as T;
};

export const getFromCollection = <T>(
  collection: AngularFirestoreCollection<T>
) => {
  return collection.get().pipe(map((qs) => qs.docs.map(mapDoc)));
};

export const getFromQuery = <T>(query: Query<T>) => {
  return from(query.get()).pipe(map((qs) => qs.docs.map(mapDoc)));
};

export const getFirstFromCollection = <T>(
  collection: AngularFirestoreCollection<T>
) => {
  return collection.get().pipe(map((q) => mapDoc(q.docs[0])));
};

export const getFirstFromQuery = <T>(query: Query<T>) => {
  return from(query.get()).pipe(
    map((q) => (q.empty || q.docs.length === 0 ? undefined : mapDoc(q.docs[0])))
  );
};
