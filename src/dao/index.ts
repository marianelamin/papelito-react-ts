import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { FirestorePapelito } from 'papelito-models/firestore'
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  addDoc
} from 'firebase/firestore'
import { Papelito } from 'papelito-models'
export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// const collectionReference = (collectionName: string) =>
//   collection(db, collectionName)

console.log(
  `dbURL are the same: ${
    app.options.databaseURL === firebaseConfig.databaseURL
  }`
)
// true
// console.log(`collection reference:`)
// getDocs(collectionReference('gameRooms'))
//   .then((_) => {
//     console.log(_.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
//     console.log('PASO 1')
//   })
//   .catch((e) => console.error(e))

// console.log(`onSnapshot testing:`)
// let papelito = new FirestorePapelito(
//   'some text',
//   'jbUoOduiY1XtncKx5exs',
//   false,
//   false
// )
// addDoc(
//   collectionReference('gameRooms/nlvg717HcEthx29jerVL/bowl'),
//   papelito.toMap()
// )
//   .then((addedDoc) => {
//     const newPap = addedDoc.id
//     console.log(`Added pap`, addedDoc)
//     return getDoc(addedDoc)

//     // addedDoc.id
//     // console.log(`Added pap ${papelito.id}`)
//     // return papelito
//   })
//   .then((doc) => {
//     console.log('doc', doc)
//     let pap = doc.data()
//     pap = { ...pap, id: doc.id }
//     console.log('saved pap', pap)
//     return pap
//   })

// export const subs = onSnapshot(
//   // query(collection(db, 'gameRooms')),
//   doc(db, 'gameRooms', '7w1yEFNRjWQdYo4VVUaS'),
//   (_) => {
//     // console.log(_.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
//     console.log('leer o q?', _)
//   },
//   (e) => console.error(e)
// )

export const auth = getAuth()
// signInAnonymously(auth)
//   .then(() => {
//     // Signed in..
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });
