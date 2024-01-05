import * as collectionsRef from './collection_references'
import { FirestoreRoom } from 'papelito-models/firestore'
import { Room } from 'papelito-models'

export const create = async (): Promise<Room> => {
  console.log('creating room from room dao')

  const newRoom: Room = new Room()

  try {
    const room = await collectionsRef.addDoc(
      collectionsRef.roomRef(),
      FirestoreRoom.fromRoom(newRoom)
    )

    console.log('sucess creating room')
    newRoom.id = newRoom.code = room.id

    //  update code with id
    await collectionsRef.updateDoc(
      collectionsRef.doc(collectionsRef.roomRef(), newRoom.id),
      {
        id: newRoom.id
      }
    )
    console.log('successfully updated code and id')
    return await getDetailsById(newRoom.id)
  } catch (error) {
    console.error(error)
    throw new Error('Error creating new room')
  }
}

export const getDetailsById = async (id: string): Promise<Room> => {
  try {
    const room = await collectionsRef
      .getDoc(collectionsRef.doc(collectionsRef.roomRef(), id))
      .then((doc) => {
        const retrievedRoom = (doc.data()!).toRoom()
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
  const snapshot = await collectionsRef.getDocs(collectionsRef.roomRef())
  snapshot.forEach((doc) => {
    const room = doc.data()
    room.id = doc.id
    res.push(room.toRoom())
    console.log(`${doc.id} => ${room}`)
  })
  return res
}

export const remove = async (roomId: string) => {
  await collectionsRef.deleteDoc(
    collectionsRef.doc(collectionsRef.roomRef(), roomId)
  )
}

export default this
