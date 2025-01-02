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
  const doc = await fs.getDoc(fs.doc(playersRef(roomId), id))
  return (doc.data() as FirestorePlayer)?.toPlayer(doc.id)
}

export const markPlayerSubmittedPapelitos = async (roomId: string, id: string) => {
  await fs.updateDoc(fs.doc(playersRef(roomId), id), {
    has_submitted_papelitos: true
  })
}

export const markPlayerForResubmission = async (roomId: string, id: string) => {
  await fs.updateDoc(fs.doc(playersRef(roomId), id), {
    has_submitted_papelitos: false
  })
}

export const grantAdminRole = async (roomId: string, id: string) => {
  await fs.updateDoc(fs.doc(playersRef(roomId), id), {
    is_admin: true
  })
}
export const removeAdminRole = async (roomId: string, id: string) => {
  await fs.updateDoc(fs.doc(playersRef(roomId), id), {
    is_admin: false
  })
}

export const removePlayerById = async (roomId: string, id: string) => {
  await fs.deleteDoc(fs.doc(playersRef(roomId), id))
}

export const getAllPlayers = async (roomId: string) => {
  const players: Player[] = []

  const querySnapshot = await fs.getDocs(playersRef(roomId))
  querySnapshot.forEach((fsPlayer) => {
    const retrievedPlayer = fsPlayer.data().toPlayer(fsPlayer.id)
    players.push(retrievedPlayer)
  })

  return players
}

export default this
