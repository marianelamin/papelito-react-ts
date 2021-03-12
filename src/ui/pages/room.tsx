import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { RoomRouteParams } from 'routes'
import { PapelitoWrapper } from 'ui/views/papelito_game'
import { TicTacToe } from 'ui/views/tictactoe'

const Room: FC = () => {
  const { id } = useParams<RoomRouteParams>()

  return (
    <div>
      <h1>
        Room Page (<span> {id} </span>)
      </h1>
      <PapelitoWrapper></PapelitoWrapper>
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Room
