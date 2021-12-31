import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { RoomRouteParams } from 'routes'

import PapelitoWrapper from 'ui/views/papelito_game'
import { useRoom } from 'hooks/use_room'

const Room: FC = () => {
  // const { id } = useParams<RoomRouteParams>()
  const id = 'AAAAAA'
  const { isFetching, room } = useRoom(id)

  return (
    <div>
      <h1>
        Room Code: <span> {id} </span>
      </h1>
      <pre>Room Details: {room}</pre>
      <PapelitoWrapper room={room}></PapelitoWrapper>
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Room
