import firebase from 'firebase/firestore'

export interface MapAndClone<T> {
  toMap(): Object
  //   clone(a: T): T // this should be a static clone.. how to do that?
}

export function convertToFromFirestore<T extends MapAndClone<T>>(
  cloneCb: Function
): firebase.FirestoreDataConverter<T> {
  return {
    toFirestore: (object: T): firebase.DocumentData => {
      return object.toMap()
    },
    fromFirestore: (
      snapshot: firebase.QueryDocumentSnapshot,
      options: firebase.SnapshotOptions
    ): T => {
      const data = snapshot.data(options) as any as T
      console.log(`instance of ${typeof data}`)
      console.log(data)
      //   return T.clone(data)
      return cloneCb(data)
    },
  }
}
