import * as collectionsRef from './collection_references'
import { FirestoreRoom } from 'papelito-models/firestore'
import { Room } from 'papelito-models'

export const create = async () => {
  console.log(`creating room from room dao`)

  let newRoom: Room = new Room()

  try {
    // create room document

    const anyRef = collectionsRef.anyRef('gameRooms')

    await collectionsRef
      .addDoc(collectionsRef.roomRef(), FirestoreRoom.fromRoom(newRoom))
      .then((addedDoc) => {
        console.log('sucess creating room')
        newRoom.id = newRoom.code = addedDoc.id
      })
    //  update code with id
    await collectionsRef
      .updateDoc(
        collectionsRef.doc(collectionsRef.roomRef(), newRoom.id),
        FirestoreRoom.fromRoom(newRoom)
      )
      .then(() => {
        console.log('successfully updated code and id')
      })
    // retrieve generated room document
    return getDetailsById(newRoom.id)
  } catch (error) {
    console.error(error)
    throw new Error('Error creating new room')
  }
}

export const getDetailsById = async (id: string) => {
  let room = new Room()
  try {
    room = await collectionsRef
      .getDoc(collectionsRef.doc(collectionsRef.roomRef(), id))
      .then((doc) => {
        let retrievedRoom = (doc.data() as FirestoreRoom).toRoom()
        retrievedRoom.id = doc.id
        console.log(`room retrieved:`)
        console.log(retrievedRoom)

        return retrievedRoom
      })
  } catch (error) {
    throw new Error(`Error getting room with id: ${id}`)
  }
  return room
}

export const getAll = async () => {
  const ref = collectionsRef.roomRef()
  let res: Room[] = []
  const snapshot = await collectionsRef.getDocs(ref)
  snapshot.forEach((doc) => {
    let room = doc.data() as FirestoreRoom
    room.id = doc.id
    res.push(room.toRoom())
    console.log(`${doc.id} => ${room}`)
  })
  return res
}

export default this
