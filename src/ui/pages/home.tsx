import { FC } from 'react'
import HomeContainer from 'ui/views/containers/home_container'
import { AlertContextProvider } from 'utilities/context/globalAlertContext'
import { GlobalDialogContextProvider } from 'utilities/context/globalDialogContext'

const Home: FC = () => {
  return (
    <div>
      <AlertContextProvider>
        <GlobalDialogContextProvider>
          <HomeContainer></HomeContainer>
        </GlobalDialogContextProvider>
      </AlertContextProvider>
    </div>
  )
}

export default Home
