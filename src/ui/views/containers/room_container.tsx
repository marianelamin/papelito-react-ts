import { FC } from 'react'
import { useRoom } from 'hooks'

import { PapelitoGame } from 'ui/components/papelito_game'
import { ToolbarContainer } from './toolbar_container'

const RoomContainer: FC = () => {
  const {} = useRoom() // to keep listening to changes in the room document

  return (
    <>
      <ToolbarContainer />
      <PapelitoGame />
    </>
  )
}

export default RoomContainer
