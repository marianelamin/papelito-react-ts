import { type FC } from 'react'
import RoomContainer from '../../views/main_container'
import { UserContextProvider } from '../../../utilities/context/userContext'

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
