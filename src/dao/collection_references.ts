import { db, collection } from './index'
import collections from './collections'
import { convertToFromFirestore } from '../dao/firebase_helpers'
import {
  FirestorePlayer,
  FirestoreRoom,
  FirestoreTeam,
  FirestorePapelito,
} from 'papelito-models/firestore'
import { addDoc, doc, setDoc } from 'firebase/firestore'
export { doc, getDoc, getDocs, addDoc, updateDoc, onSnapshot } from './index'

export const anyRef = (collectionName: string) => collection(db, collectionName)

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
