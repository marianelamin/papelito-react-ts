import { FC } from 'react'
import RoomContainer from 'ui/containers/room_container'
import { AlertContextProvider } from 'utilities/context/globalAlertContext'
import { GlobalDialogContextProvider } from 'utilities/context/globalDialogContext'
import { UserContextProvider } from 'utilities/context/userContext'

const Room: FC = () => {
  return (
    <div>
      <AlertContextProvider>
        <UserContextProvider>
          <GlobalDialogContextProvider>
            <RoomContainer></RoomContainer>
          </GlobalDialogContextProvider>
        </UserContextProvider>
      </AlertContextProvider>
    </div>
  )
}

export default Room
