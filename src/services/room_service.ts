import { Player, Team, Room } from 'papelito-models'
import * as roomDao from '../dao/room_dao'
import * as playerService from 'services/player_service'

export const joinRoom = async (roomCode: string, playerName: string) => {
  console.log(`room requested: ${roomCode}...`)

  let room: Room = await roomDao.getDetailsById(roomCode)
  let playerCreated = await playerService.createPlayer(room.id, playerName)

  return { room: room, player: playerCreated }
}

export const createRoom = async (playerName: string) => {
  console.log(`creating room for player: ${playerName}...`)

  //create a room
  let room: Room
  let roomCreated = await roomDao.create().then((newRoom) => {
    room = newRoom
    console.log(room)
    console.log(`need to create player with name ${playerName}`)
    return room
  })

  let playerCreated = await playerService.createPlayer(
    roomCreated.id,
    playerName
  )

  return { room: roomCreated, player: playerCreated }
}

export const getRooms = () => {
  return roomDao.getAll().then((roomsList) => {
    roomsList.forEach((room) => {
      console.log(room)
    })
    return roomsList
  })
}

export default this
