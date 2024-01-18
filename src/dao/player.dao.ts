import { fs, playersRef } from './collection_references'
import { type Player } from '../models'
import { FirestorePlayer } from '../models/firestore'

export const create = async (roomId: string, player: Player) => {
  await fs.addDoc(playersRef(roomId), FirestorePlayer.fromPlayer(player)).then((addedDoc) => {
    player.id = addedDoc.id
  })

  return await getPlayerById(roomId, player.id)
}

export const getPlayerById = async (roomId: string, id: string) => {
  return await fs.getDoc(fs.doc(playersRef(roomId), id)).then((doc) => {
    const retrievedPlayer = doc.data()!.toPlayer()
    retrievedPlayer.id = doc.id
    return retrievedPlayer
  })
}

export const markPlayerSubmittedPapelitos = async (roomId: string, id: string) => {
  // todo mark player as submitted papelitos
  await fs.updateDoc(fs.doc(playersRef(roomId), id), {
    has_submitted_papelitos: true
  })

  // return getDoc().then((doc) => {
  //   let retrievedPlayer = (doc.data() as FirestorePlayer).toPlayer()
  //   retrievedPlayer.id = doc.id
  //   return retrievedPlayer
  // })
}

export const removePlayerById = async (roomId: string, id: string) => {
  await fs.deleteDoc(fs.doc(playersRef(roomId), id))
}

export const getAllPlayers = async (roomId: string) => {
  const players: Player[] = []
  // todo: make this call work
  const querySnapshot = await fs.getDocs(playersRef(roomId))
  querySnapshot.forEach((fsPlayer) => {
    const retrievedPlayer = fsPlayer.data().toPlayer()
    retrievedPlayer.id = fsPlayer.id
    players.push(retrievedPlayer)
  })

  return players
}

export default this
