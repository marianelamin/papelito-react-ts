import React from 'react'

import { Header } from '../../../ui/views/header'
import { RoomSetup } from '../room-setup-wizard/setup/room_setup'
import { Players } from '../../../ui/components'
import { UserContextProvider } from '../../../utilities/context'
import Footer from '../../../ui/views/footer'

const RoomPage: React.FC = () => {
  return (
    <UserContextProvider>
      <Header />
      <div>
        <div>
          <RoomSetup />
        </div>
        <div>
          <Players />
        </div>
      </div>
      <Footer />
    </UserContextProvider>
  )
}

export default RoomPage
