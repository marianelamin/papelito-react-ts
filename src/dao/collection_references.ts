import { db, collection } from './index'
import collections from './collections'
import { convertToFromFirestore } from './firebase_helpers'
import {
  FirestorePlayer,
  FirestoreRoom,
  FirestoreTeam,
  FirestorePapelito,
  FirestoreTurn
} from '../models/firestore'
export { onSnapshot, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

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

export const turnsRef = (roomCode: string) => {
  return collection(db, collections.turns(roomCode)).withConverter(
    convertToFromFirestore<FirestoreTurn>(FirestoreTurn.clone)
  )
}
