import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '+redux/store'
import * as roomService from '../../services/room_service'
import * as playersService from '../../services/player_service'
import { Room, Player } from 'papelito-models'

const Home: FC = () => {
  const history = useNavigate()
  const testingStoreSelector = useSelector((state: RootState) => state.room)

  const [room, setRoom] = useState<Room | undefined>(undefined)
  const [player, setPlayer] = useState<Player | undefined>(undefined)

  // POCs
  const [rooms, setRooms] = useState([new Room()])
  const [players, setPlayers] = useState([new Player('')])

  const joinRoom = () => {
    console.log(`join a room with id: ${room?.id}`)

    if (!playerNameInput) {
      console.log('need player name')
      return
    }
    let playerName = playerNameInput.trim()

    if (roomCodeInput) {
      roomService
        .joinRoom(roomCodeInput.trim(), playerName)
        .then((res) => {
          setRoom((_) => res.room)
          setPlayer((_) => res.player)
        })
        .catch((error) => console.error(error))

      // history.push(`/room/${roomCode}`)
    } else {
      console.log('no room id available')
    }
  }

  const createRoom = () => {
    // Todo: create a room and get the room code back
    let playerName: string = 'First Player'
    if (playerNameInput) playerName = playerNameInput.trim()

    console.log('create a room')
    roomService
      .createRoom(playerName)
      .then((res) => {
        setRoom(res.room)
        setPlayer(res.player)
        // history.push(`/room/${roomCode}`)
      })
      .catch((error) => {
        setRoom(undefined)
        setPlayer(undefined)
        console.log(error)
      })
  }

  const addPlayer = () => {
    let playerName = 'Marianela'
    let addedPlayer
    if (room?.id) {
      addedPlayer = playersService
        .createPlayer(room.id, playerName)
        .then((addedPlayer: Player) => {
          setPlayer((c) => addedPlayer)
          console.log(
            `successfuly added player with name : ${addedPlayer.name}`
          )
        })
        .catch((error) => console.log(error))
    } else {
      console.log('problem with adding player')
    }
  }

  const getRooms = () => {
    roomService
      .getRooms()
      .then((list) => {
        console.log(list)
        setRooms(list)
      })
      .catch((error) => console.log(error))
  }

  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [playerNameInput, setplayerNameInput] = useState<string>('')
  const onChangeRoomText = (event: any) => {
    setRoomCodeInput(event.target.value)
  }
  const onChangePlayerText = (event: any) => {
    setplayerNameInput(event.target.value)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div>New stuff testingStoreSelector:</div>
      <pre>{JSON.stringify(testingStoreSelector, null, 2)}</pre>

      <div>
        <button
          disabled={roomCodeInput.length == 0 || playerNameInput.length == 0}
          onClick={joinRoom}
        >
          Join Room
        </button>
        <input
          id="roomCodeField"
          type="text"
          placeholder="Enter room code..."
          value={roomCodeInput}
          onChange={onChangeRoomText}
        />
        <input
          id="playerNameField"
          type="text"
          placeholder="Enter player name..."
          value={playerNameInput}
          onChange={onChangePlayerText}
        />
      </div>
      <div>
        <button onClick={createRoom}>Create Room</button>
      </div>
      <button onClick={getRooms}>Get Rooms</button>
      {/* <button onClick={addPlayer}>Add Player</button> */}

      <pre> Player </pre>
      <pre>{JSON.stringify(player, null, 2)}</pre>
      <pre> Object back from firebase </pre>
      <pre> ----- start ------ </pre>
      <pre>{JSON.stringify(room, null, 2)}</pre>
      <pre> ------ end ------- </pre>
      {/* <pre>{JSON.stringify(players, null, 2)}</pre> */}
      <pre>{JSON.stringify(rooms, null, 2)}</pre>

      <div>PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Home
