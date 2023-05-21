import PapelitoLocalStorage from 'localStorage'
import { Player } from 'papelito-models'
import * as playerDao from '../dao/player_dao'

export const addPlayerToRoom = async (roomCode: string, playerName: string) => {
  console.log(`creating a player ${playerName}`)
  const newPlayer: Player = await playerDao.create(roomCode, playerName)

  return newPlayer
}

export const getPlayerById = async (roomCode: string, playerId: string) => {
  console.log(`retrieving a player ${playerId}`)
  return await playerDao.getPlayerById(roomCode, playerId)
}

export const removePlayerById = async (roomCode: string, playerId: string) => {
  console.log(`removing a player ${playerId}`)
  await playerDao.removePlayerById(roomCode, playerId)
}

// export const getPlayersByTeam = (roomCode: string) => {}

export const getAllPlayers = async (roomCode: string) => {
  return playerDao.getAllPlayers(roomCode)
}
