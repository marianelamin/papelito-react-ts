import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { getAuth, signInAnonymously } from 'firebase/auth'
export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore/lite'
export { onSnapshot } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const collectionReference = (collectionName: string) =>
  collection(db, collectionName)
console.log(
  `dbURL are the same: ${
    app.options.databaseURL === firebaseConfig.databaseURL
  }`
) // true
console.log(`collection reference:`)
getDocs(collectionReference('gameRooms'))
  .then((_) => {
    console.log(_.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    console.log('PASO 1')
  })
  .catch((e) => console.error(e))

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

// addDoc(collection(db, 'gameRooms'), {
//   field1: 'Name',
//   field2: 'testCollection',
// })
