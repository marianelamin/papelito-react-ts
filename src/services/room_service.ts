import { Player, Team, Room } from 'papelito-models'
import * as roomDao from '../dao/room_dao'
import { playerService } from 'services'

export const joinRoom = async (roomCode: string, playerName: string) => {
  console.log(`room requested: ${roomCode}...`)

  let room: Room = await roomDao.getDetailsById(roomCode)
  let playerCreated: Player = await playerService.addPlayerToRoom(
    room.id,
    playerName
  )

  return { room: room, player: playerCreated }
}

export const createJustRoom = async (): Promise<Room> => {
  const room = await roomDao.create()
  console.log(`Room created: ${room.id}`)

  return room
}

export const createRoom = async (playerName: string) => {
  console.log(`creating room for player: ${playerName}...`)

  //create a room
  let room: Room = await createJustRoom()
  let player: Player = await playerService.addPlayerToRoom(room.id, playerName)

  return { room: room, player: player }
}

export const remove = async (roomId: string) => {
  return await roomDao.remove(roomId)
}

// export const getRooms = () => {
//   return roomDao.getAll().then((roomsList) => {
//     roomsList.forEach((room) => {
//       console.log(room)
//     })
//     return roomsList
//   })
// }

export const getRoomById = (id: string) => {
  return roomDao.getDetailsById(id).then((room) => {
    // console.log(`Room retrieved from firestore ${room.id}`)
    // console.log(room)
    return room
  })
}

export default this
