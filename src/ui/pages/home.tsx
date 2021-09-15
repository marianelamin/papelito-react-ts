import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as roomDao from '../../services/room_dao'
import Room from 'ui/models/room'

const Home: FC = () => {
  const history = useHistory()
  let roomCode

  let data
  let numberTest

  const goToRoom = () => {
    roomCode = 'AAAAAA'
    console.log('join a room')
    console.log('create a player')
    console.log('if no team, create a team')
    getData('AAAAAA')
    // history.push(`/room/${roomCode}`)
  }

  const createRoom = () => {
    // Todo: create a room and get the room code back
    roomCode = 'AAAAAA'
    console.log('create a room')
    console.log('create a player')
    console.log('if no team, create a team')
    // history.push(`/room/${roomCode}`)
  }

  const getData = (code: string) => {
    console.log(`room code is ${code}`)

    roomDao
      .getRoomDetails(code)
      .then((doc) => {
        if (doc.exists) {
          data = doc.data()
          console.log('Document data:', data)
          numberTest = 10
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToRoom}>Go to Room</button>
      <button onClick={createRoom}>Create a Room</button>
      <pre> object back from firebase </pre>
      <pre> ----- start ------ </pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre> ------ end ------- </pre>
      <pre> {numberTest}</pre>

      <div>PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default Home
