import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home: FC = () => {
  const history = useHistory()
  let roomCode

  const goToRoom = () => {
    roomCode = 'AAAAAA'
    console.log('join a room')
    console.log('create a player')
    console.log('if no team, create a team')

    history.push(`/room/${roomCode}`)
  }

  const createRoom = () => {
    // Todo: create a room and get the room code back
    roomCode = 'AAAAAA'
    console.log('create a room')
    console.log('create a player')
    console.log('if no team, create a team')
    history.push(`/room/${roomCode}`)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToRoom}>Go to Room</button>
      <button onClick={createRoom}>Create a Room</button>
      <div>PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Home
