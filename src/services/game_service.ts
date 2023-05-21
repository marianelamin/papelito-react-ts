import { roomService, papelitoService, playerService } from 'services'
import PapelitoLocalStorage from 'localStorage'

// start game

// end game

// start turn

// end turn

// draw papelito

// guess papelito

// put back papelito

// remove player that created another user by accident.
export const removePlayerById = async (roomId: string, playerId: string) => {
  await playerService.removePlayerById(roomId, playerId)
  await cleanupRoomIfNeccesary(roomId)
}

// current user leaves the room
export const exitRoom = async (roomId: string, playerId: string) => {
  // await papelito_service.removePlayerPapelitos(roomId, playerId, papelitoIds)
  await playerService.removePlayerById(roomId, playerId)
  await cleanupRoomIfNeccesary(roomId)
}

/** PRIVATE HELPERS */

const cleanupRoomIfNeccesary = async (roomId: string) => {
  // room id passed by the state
  const playersLeft = await playerService.getAllPlayers(roomId)

  if (playersLeft.length === 0) {
    // if there are 0 players, remove the room and proceed to:
    await roomService.remove(roomId)
    PapelitoLocalStorage.clear()
  }
}
