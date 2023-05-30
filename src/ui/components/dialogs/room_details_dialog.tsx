import { useSelector } from 'react-redux'
import { RootState } from '+redux/store'
import { PapDialog } from '../common'
import { Room } from 'papelito-models'

import { format } from 'date-fns'
import { useMemo } from 'react'

interface RoomDetailsDialogProps {
  close: () => void
}

export const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { close } = props
  const room = useSelector<RootState, Room | undefined>(
    (state) => state.room.room
  )

  const createdDate = useMemo(() => {
    if (room?.createdDate) {
      try {
        return format(room.createdDate, 'yyyy-MM-dd')
      } catch (error) {
        console.error({ error })
        return 'na'
      }
    } else return 'na'
  }, [room])
  return (
    <PapDialog
      headerLabel={'Room Details'}
      visible
      closable
      closeOnEscape
      onVisibleChange={() => close()}
    >
      <div className="card">
        <div>
          <h4> {'Settings'}</h4>
          <p>{`papelitoPerPlayer: ${room?.settings.papelitoPerPlayer}`}</p>
          <p>{`papelitoTextLimit: ${room?.settings.papelitoTextLimit}`}</p>
          <p>{`timerTurn: ${room?.settings.timerTurn}`}</p>
          <p>{`rounds: ${room?.settings.rounds}`}</p>

          <p>{`id: ${room?.id}`}</p>
          <p>{`code: ${room?.code}`}</p>
          <p>{`Private Room: ${room?.isPrivate ? 'Yes' : 'No'}`}</p>

          <h3>{'ActiveTurn:'}</h3>
          <p>{`active: ${room?.activeTurn.active}`}</p>
          <p>{`activePlayerId: ${room?.activeTurn.activePlayerId}`}</p>
          <p>{`activeTeamId: ${room?.activeTurn.activeTeamId}`}</p>
          <p>{`guessedPapelitos: ${room?.activeTurn.guessedPapelitos}`}</p>
          <p>{`timerCount: ${room?.activeTurn.timerCount}`}</p>

          <p>{`Round: ${room?.round}`}</p>
          {room?.createdDate && <p>{`createdDate: ${createdDate}`}</p>}

          <pre style={{ display: 'flex', background: 'lightgray' }}>
            {JSON.stringify(room, null, 2)}
          </pre>
        </div>
      </div>
    </PapDialog>
  )
}
