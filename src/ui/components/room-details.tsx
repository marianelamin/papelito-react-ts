import { type RootState } from '../../store-redux/store'
import { type Room } from '../../models'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

export const RoomDetails = (): JSX.Element => {
  const room = useSelector<RootState, Room | undefined>((state) => state.room.room)

  const createdDate = useMemo(() => {
    return room?.createdDate ? format(room.createdDate, 'yyyy-MM-dd HH:mm:ss zzz') : 'N/A'
  }, [room])

  return (
    <div className={'col-12'}>
      <div>
        <h3 className="text-center m-0">Room Details</h3>
      </div>
      <div className={'grid gap-3 p-3'}>
        <div>
          <h4> {'Settings'}</h4>
          <p>{`Room created on: ${createdDate}`}</p>
          <p>{`code: ${room?.code}`}</p>
          <p>{`id: ${room?.id}`}</p>
          <p>{`Private Room: ${room?.settings?.isPrivate ? 'Yes' : 'No'}`}</p>
          <p>{`papelitoPerPlayer: ${room?.settings?.papelitoPerPlayer}`}</p>
          <p>{`papelitoTextLimit: ${room?.settings?.papelitoTextLimit}`}</p>
          <p>{`timerTurn: ${room?.settings?.timerTurn}`}</p>
          <p>{`rounds: ${room?.settings?.rounds}`}</p>
        </div>

        {/* <div>
          <h4>{'ActiveTurn'}</h4>
          <p>{`active: ${room?.activeTurn.active}`}</p>
          <p>{`activePlayerId: ${room?.activeTurn.activePlayerId}`}</p>
          <p>{`activeTeamId: ${room?.activeTurn.activeTeamId}`}</p>
          <p>{`guessedPapelitos: ${room?.activeTurn.guessedPapelitos}`}</p>
          <p>{`timerCount: ${room?.activeTurn.timerCount}`}</p>
          <p>{`round: ${room?.round}`}</p>
        </div> */}

        <div>
          <pre style={{ background: 'lightgray' }}>{JSON.stringify(room, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
