import { useRoom, useGame, usePlayer } from './../../hooks'
import PapelitoLocalStorage from 'localStorage'
import { FC } from 'react'
import HomeContainer from 'ui/containers/home_container'

const Home: FC = () => {
  return (
    <div>
      <HomeContainer></HomeContainer>
    </div>
  )
}

export default Home
