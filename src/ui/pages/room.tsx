import React, { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import PapelitoLocalStorage from 'localStorage'
import { RoomRouteParams } from 'routes'

import { RootState, useAppDispatch } from '+redux/store'
import {
  RoomState,
  roomSlice,
  fetchRoomById,
} from '+redux/feature/room/room_slice'
import {
  PlayerState,
  playerSlice,
  getPlayerById,
} from '+redux/feature/player/player_slice'

import PapelitoWrapper from 'ui/views/papelito_game'
import { useRoom } from 'hooks/use_room'

const Room: FC = () => {
  const { id } = useParams()
  // const { id } = useParams<RoomRouteParams>()
  // const id = 'AAAAAA'
  // const { isFetching, room } = useRoom(id)

  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const room: RoomState = useSelector((state: RootState) => state.room)
  const currentPlayer: PlayerState = useSelector(
    (state: RootState) => state.currentPlayer
  )

  useEffect(() => {
    if (room.loaded == false) {
      let roomId = PapelitoLocalStorage.getRoomId()
      let playerId = PapelitoLocalStorage.getPlayerId()
      if (roomId && playerId) {
        appDispatch(fetchRoomById(roomId))
        appDispatch(getPlayerById({ roomId: roomId, playerId: playerId }))
      } else {
        console.error('No roomId found on localStorage')
        navigate('/')
      }
    }

    return () => {
      console.log('end of use effect... :s')
    }
  })

  return (
    <div>
      <h1>Room </h1>
      <small>
        localStorage: {room.roomCode} <br />
        routeParam: {id}
      </small>

      <div style={{ display: 'flex' }}>
        <div>
          <p>Room Details: </p>
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>

        <div>
          <p>Player Details: </p>
          <pre>{JSON.stringify(currentPlayer, null, 2)}</pre>
        </div>
      </div>
      <PapelitoWrapper></PapelitoWrapper>
      <br />
      <br />
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Room
