import { db, collectionReference, collection } from './index'
import collections from './collections'
import { convertToFromFirestore } from '../dao/firebase_helpers'
import {
  FirestorePlayer,
  FirestoreRoom,
  FirestoreTeam,
  FirestorePapelito,
} from 'papelito-models/firestore'
import { addDoc, doc, setDoc, getDocs } from 'firebase/firestore/lite'
export {
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore/lite'
export { onSnapshot } from 'firebase/firestore'

// export const anyRef = async (collectionName: string) => {
//   let docRef = collectionReference(collectionName)
//   try {
//     let list = await getDocs(collectionReference('gameRooms'))

//     console.log(list.docs.map((doc) => ({ id: doc.id, data: doc.data() })))

//     console.log('PASO 2')
//   } catch (e) {
//     console.error('Que vaina no?.. error en PASO 2')
//   }
// }

export const roomRef = () => {
  return collection(db, collections.rooms).withConverter(
    convertToFromFirestore<FirestoreRoom>(FirestoreRoom.clone)
  )
}

export const teamsRef = (roomCode: string) =>
  collection(db, collections.teams(roomCode)).withConverter(
    convertToFromFirestore<FirestoreTeam>(FirestoreTeam.clone)
  )

export const playersRef = (roomCode: string) =>
  collection(db, collections.players(roomCode)).withConverter(
    convertToFromFirestore<FirestorePlayer>(FirestorePlayer.clone)
  )

export const papelitoRef = (roomCode: string) =>
  collection(db, collections.papelitos(roomCode)).withConverter(
    convertToFromFirestore<FirestorePapelito>(FirestorePapelito.clone)
  )
