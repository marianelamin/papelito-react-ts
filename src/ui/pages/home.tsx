import React, { FC } from 'react'
import { PapelitoWrapper } from 'ui/views/papelito_game'
import { useHistory } from 'react-router-dom'

const Home: FC = () => {
  const history = useHistory()
  let roomCode

  function goToRoom() {
    roomCode = 'AAAA'
    history.push(`/room/${roomCode}`)
  }
  function createRoom() {
    // Todo: create a room and get the room code back
    roomCode = 'AAAA'
    history.push(`/room/${roomCode}`)
  }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToRoom}>Go to Room</button>
      <button onClick={createRoom}>Create a Room</button>
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Home
