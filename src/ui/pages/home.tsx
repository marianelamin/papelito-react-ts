import { FC } from 'react'
import HomeContainer from 'ui/views/containers/home_container'
import { AlertContextProvider } from 'utilities/context/globalAlertContext'

const Home: FC = () => {
  return (
    <div>
      <AlertContextProvider>
        <HomeContainer></HomeContainer>
      </AlertContextProvider>
    </div>
  )
}

export default Home
