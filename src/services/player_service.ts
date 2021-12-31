import { Player } from 'papelito-models'
import * as playerDao from '../dao/player_dao'

export const createPlayer = async (roomCode: string, playerName: string) => {
  console.log(`creating a player ${playerName}`)
  const newPlayer: Player = await playerDao.create(roomCode, playerName)

  return newPlayer
}

// export const getPlayersByTeam = (roomCode: string) => {}

// export const getPlayers = (roomCode: string) => {
//   let result = playerDao.getGamePlayers(roomCode)
//   return result
// }
export default this
