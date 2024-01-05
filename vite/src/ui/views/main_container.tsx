import React from 'react'

import { ToolbarContainer } from './toolbar_container'
import { RoomSetup } from '../modules/room-setup/setup/room_setup'
import { Players } from '../../ui/components'

const RoomContainer: React.FC = () => {
  return (
    <>
      <ToolbarContainer />
      <div>
        <div>
          <RoomSetup />
        </div>
        <div>
          <Players />
        </div>
      </div>
      <div style={{ backgroundColor: 'gainsboro' }}> footer </div>
    </>
  )
}

export default RoomContainer
