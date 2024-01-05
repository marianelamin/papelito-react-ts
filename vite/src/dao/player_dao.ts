import * as collectionsRef from './collection_references'
import { type Player, defaultPlayer } from '../papelito-models'
import { FirestorePlayer } from '../papelito-models/firestore'

// export const getGamePlayers = async (roomCode: string) => {
//   console.log(`getting room details from room dao: ${roomCode}`)
//   let res: Player[] = []

//   // const querySnapshot = await collectionsRef.playersRef(roomCode)

//   return res
// }

export const create = async (roomCode: string, playerName: string) => {
  console.log(`creating a player with name: ${playerName}`)

  const player: Player = { ...defaultPlayer, name: playerName }

  await collectionsRef
    .addDoc(collectionsRef.playersRef(roomCode), FirestorePlayer.fromPlayer(player))
    .then((addedDoc) => {
      player.id = addedDoc.id
    })

  return await getPlayerById(roomCode, player.id)
}

export const getPlayerById = async (roomCode: string, id: string) => {
  return await collectionsRef
    .getDoc(collectionsRef.doc(collectionsRef.playersRef(roomCode), id))
    .then((doc) => {
      const retrievedPlayer = doc.data()!.toPlayer()
      retrievedPlayer.id = doc.id
      return retrievedPlayer
    })
}

export const markPlayerSubmittedPapelitos = async (roomCode: string, id: string) => {
  // todo mark player as submitted papelitos
  await collectionsRef.updateDoc(collectionsRef.doc(collectionsRef.playersRef(roomCode), id), {
    has_submitted_papelitos: true
  })

  // return collectionsRef.getDoc().then((doc) => {
  //   let retrievedPlayer = (doc.data() as FirestorePlayer).toPlayer()
  //   retrievedPlayer.id = doc.id
  //   return retrievedPlayer
  // })
}

export const removePlayerById = async (roomCode: string, id: string) => {
  await collectionsRef.deleteDoc(collectionsRef.doc(collectionsRef.playersRef(roomCode), id))
}

export const getAllPlayers = async (roomCode: string) => {
  const players: Player[] = []
  // todo: make this call work
  const querySnapshot = await collectionsRef.getDocs(collectionsRef.playersRef(roomCode))
  querySnapshot.forEach((fsPlayer) => {
    const retrievedPlayer = fsPlayer.data().toPlayer()
    retrievedPlayer.id = fsPlayer.id
    players.push(retrievedPlayer)
  })

  return players
}

export default this
