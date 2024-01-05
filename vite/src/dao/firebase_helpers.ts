import type firebase from 'firebase/firestore'

export function convertToFromFirestore<T>(
  cloneCb: (data: T) => T
): firebase.FirestoreDataConverter<T> {
  return {
    toFirestore: (object: T): firebase.DocumentData => JSON.parse(JSON.stringify(object)),
    fromFirestore: (
      snapshot: firebase.QueryDocumentSnapshot,
      options: firebase.SnapshotOptions
    ): T => {
      const data = snapshot.data(options) as unknown as T
      return cloneCb(data)
    }
  }
}
