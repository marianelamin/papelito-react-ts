import { type Player, type Room } from '../models'
import * as roomDao from '../dao/room.dao'
import { playerService } from '.'

export const joinRoom = async (roomId: string, playerName: string) => {
  const room: Room = await roomDao.getDetailsById(roomId)
  const playerCreated: Player = await playerService.addPlayerToRoom(room.id, playerName)

  return { room, player: playerCreated }
}

export const createJustRoom = async (): Promise<Room> => {
  const room = await roomDao.create()
  console.log(`Room created: ${room.id}`)

  return room
}

export const createRoomAndSetup = async (playerName: string) => {
  console.log(`creating room for player: ${playerName}...`)
  const room: Room = await createJustRoom()
  await roomDao.createTimer(room.id)
  const player: Player = await playerService.addAdminPlayerToRoom(room.id, playerName)

  return { room, player }
}

export const remove = async (roomId: string) => {
  await roomDao.remove(roomId)
}

export const getRoomById = async (roomId: string) => {
  return await roomDao.getDetailsById(roomId)
}

export default this
