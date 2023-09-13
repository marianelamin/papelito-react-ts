import { FC } from 'react'

import { ToolbarContainer } from './toolbar_container'
import { PapelitoLeftPanel } from './papelito_left_panel'
import { PapelitoRightPanel } from './papelito_right_panel'

const RoomContainer: FC = () => {
  return (
    <>
      <ToolbarContainer />
      <div>
        <div>
          <PapelitoLeftPanel />
        </div>
        <div>
          <PapelitoRightPanel />
        </div>
      </div>
      <div style={{ backgroundColor: 'gainsboro' }}> footer </div>
    </>
  )
}

export default RoomContainer
