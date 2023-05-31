import { FC } from 'react'
import { useRoom } from 'hooks'

import { PapelitoGame } from 'ui/components/papelito_game'
import { ToolbarContainer } from './toolbar_container'

const RoomContainer: FC = () => {
  const {} = useRoom() // to keep listening to changes in the room document

  return (
    <div>
      <ToolbarContainer />
      <br />
      <div className="card">
        {/* <PlayerListComponent /> */}
        <PapelitoGame />
        <br />
        <br />
        <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
      </div>
    </div>
  )
}

export default RoomContainer
