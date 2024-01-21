import { db, collection } from './index'
import collections from './collections'
import { convertToFromFirestore } from './firebase_helpers'
import {
  FirestorePlayer,
  FirestoreRoom,
  FirestoreTeam,
  FirestorePapelito,
  FirestoreTurn,
  FirestoreRound,
  FirestorePapelitoClock
} from '../models/firestore'
import {
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  writeBatch
} from 'firebase/firestore'

export const batch = () => {
  return writeBatch(db)
}

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

export const roundsRef = (roomCode: string) => {
  return collection(db, collections.rounds(roomCode)).withConverter(
    convertToFromFirestore<FirestoreRound>(FirestoreRound.clone)
  )
}

export const turnsRef = (roomCode: string, roundId: string) => {
  return collection(db, collections.turns(roomCode, roundId)).withConverter(
    convertToFromFirestore<FirestoreTurn>(FirestoreTurn.clone)
  )
}

export const timerRef = (roomCode: string) => {
  return collection(db, collections.timer(roomCode)).withConverter(
    convertToFromFirestore<FirestorePapelitoClock>(FirestorePapelitoClock.clone)
  )
}

export const fs = {
  batch,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc
}
