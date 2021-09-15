import { createBrotliCompress } from 'node:zlib'
import { db } from 'services'
import collections from './db_schema_constants'

export function getRoomDetails(roomCode: string) {
  console.log(`getting room details from room dao: ${roomCode}`)
  const ref = db.collection(collections.rooms).doc(roomCode)

  return ref.get()
}

export function createRoom() {
  console.log(`creating room from room dao`)
  // todo: create new room
  const ref = db.collection(collections.rooms)

  let newRoomCode = 'randomGenerated'
  ref.doc(newRoomCode).set({})
}

export default this
