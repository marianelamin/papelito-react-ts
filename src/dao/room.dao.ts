import { fs, roomRef, timerRef } from './collection_references'
import { FirestoreRoom } from '../models/firestore'
import { Room } from '../models'

export const create = async (): Promise<Room> => {
  console.log('creating room from room dao')

  const newRoom: Room = new Room()

  try {
    const room = await fs.addDoc(roomRef(), FirestoreRoom.fromRoom(newRoom))

    console.log('sucess creating room')
    newRoom.id = newRoom.code = room.id

    //  update code with id
    await fs.updateDoc(fs.doc(roomRef(), newRoom.id), {
      id: newRoom.id
    })
    console.log('successfully updated code and id')
    return await getDetailsById(newRoom.id)
  } catch (error) {
    console.error(error)
    throw new Error('Error creating new room')
  }
}

export const getDetailsById = async (id: string): Promise<Room> => {
  try {
    const room = await fs.getDoc(fs.doc(roomRef(), id)).then((doc) => {
      const retrievedRoom = doc.data()!.toRoom()
      retrievedRoom.id = doc.id
      return retrievedRoom
    })
    return room
  } catch (error) {
    throw new Error(`Error getting room with id: ${id}`)
  }
}

export const getAll = async () => {
  const res: Room[] = []
  const snapshot = await fs.getDocs(roomRef())
  snapshot.forEach((doc) => {
    const room = doc.data()
    room.id = doc.id
    res.push(room.toRoom())
    console.log(`${doc.id} => ${room}`)
  })
  return res
}

export const remove = async (roomId: string) => {
  await fs.deleteDoc(fs.doc(roomRef(), roomId))
}

export const createTimer = async (roomId: string) => {
  await fs.setDoc(fs.doc(timerRef(roomId), 'timerId'), { count_down: 60, state: 'reset' })
}

export default this
