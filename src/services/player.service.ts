import { defaultPlayer, type Player } from '../models'
import * as playerDao from '../dao/player.dao'

export const getAllPlayers = async (roomId: string): Promise<Player[]> => {
  return await playerDao.getAllPlayers(roomId)
}

export const getPlayerById = async (roomId: string, playerId: string): Promise<Player> => {
  return await playerDao.getPlayerById(roomId, playerId)
}

export const addAdminPlayerToRoom = async (roomId: string, name: string): Promise<Player> => {
  const request: Player = { ...defaultPlayer, name, isAdmin: true }
  return await playerDao.create(roomId, request)
}

export const addPlayerToRoom = async (roomId: string, name: string): Promise<Player> => {
  const request: Player = { ...defaultPlayer, name }
  return await playerDao.create(roomId, request)
}

// Update ??
export const markPlayerSubmittedPapelitos = async (
  roomId: string,
  playerId: string
): Promise<void> => {
  console.log(`markPlayerSubmittedPapelitos ${playerId}`)
  await playerDao.markPlayerSubmittedPapelitos(roomId, playerId)
}

export const removePlayerById = async (roomId: string, playerId: string): Promise<void> => {
  await playerDao.removePlayerById(roomId, playerId)
}
