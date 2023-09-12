import { FC } from 'react'

import { ToolbarContainer } from './toolbar_container'
import { PapelitoLeftPanel } from './papelito_left_panel'
import { PapelitoRightPanel } from './papelito_right_panel'

const RoomContainer: FC = () => {
  return (
    <>
      <ToolbarContainer />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '0.5rem' }}>
          <PapelitoLeftPanel />
        </div>
        <div style={{ padding: '0.5rem' }}>
          <PapelitoRightPanel />
        </div>
      </div>
      <div style={{ backgroundColor: 'gainsboro' }}> footer </div>
    </>
  )
}

export default RoomContainer
