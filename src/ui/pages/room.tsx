import { useIsAuthenticated } from 'hooks'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomContainer from 'ui/containers/room_container'
import { useActiveUser } from 'hooks'

const Room: FC = () => {
  // const userStatus = useActiveUser()

  return (
    <div>
      {/* <pre> {JSON.stringify(userStatus, null, 2)} </pre> */}
      <RoomContainer></RoomContainer>
    </div>
  )
}

export default Room
