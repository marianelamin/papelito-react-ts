import { FC } from 'react'
import RoomContainer from 'ui/views/containers/room_container'
import { UserContextProvider } from 'utilities/context/userContext'

const Room: FC = () => {
  return (
    <div>
      <UserContextProvider>
        <RoomContainer></RoomContainer>
      </UserContextProvider>
    </div>
  )
}

export default Room
