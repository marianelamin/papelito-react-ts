import { type Player } from '../papelito-models'
import * as playerDao from '../dao/player_dao'

export const addPlayerToRoom = async (roomCode: string, playerName: string): Promise<Player> => {
  console.log(`creating a player ${playerName}`)
  const newPlayer: Player = await playerDao.create(roomCode, playerName)

  return newPlayer
}

export const getPlayerById = async (roomCode: string, playerId: string): Promise<Player> => {
  console.log(`retrieving a player ${playerId}`)
  return await playerDao.getPlayerById(roomCode, playerId)
}

export const markPlayerSubmittedPapelitos = async (
  roomCode: string,
  playerId: string
): Promise<void> => {
  console.log(`markPlayerSubmittedPapelitos ${playerId}`)
  await playerDao.markPlayerSubmittedPapelitos(roomCode, playerId)
}

export const removePlayerById = async (roomCode: string, playerId: string): Promise<void> => {
  console.log(`removing a player ${playerId}`)
  await playerDao.removePlayerById(roomCode, playerId)
}

export const getAllPlayers = async (roomCode: string): Promise<Player[]> => {
  return await playerDao.getAllPlayers(roomCode)
}
