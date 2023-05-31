import { RootState } from '+redux/store'
import { format } from 'date-fns-tz'
import { Room } from 'papelito-models'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const RoomDetails = (): JSX.Element => {
  const room = useSelector<RootState, Room | undefined>(
    (state) => state.room.room
  )

  const createdDate = useMemo(() => {
    if (room?.createdDate) {
      return format(room.createdDate, 'yyyy-MM-dd HH:mm:ss zzz')
    } else return 'N/A'
  }, [room])

  return (
    <div className="card">
      {room?.createdDate && <p>{`Room created on: ${createdDate}`}</p>}
      <h2>{`Code: ${room?.code ?? room?.id}`}</h2>

      <div>
        <h4> {'Settings'}</h4>
        <p>{`id: ${room?.id}`}</p>
        <p>{`Private Room: ${room?.isPrivate ? 'Yes' : 'No'}`}</p>
        <p>{`papelitoPerPlayer: ${room?.settings.papelitoPerPlayer}`}</p>
        <p>{`papelitoTextLimit: ${room?.settings.papelitoTextLimit}`}</p>
        <p>{`timerTurn: ${room?.settings.timerTurn}`}</p>
        <p>{`rounds: ${room?.settings.rounds}`}</p>

        <h4>{'ActiveTurn'}</h4>
        <p>{`active: ${room?.activeTurn.active}`}</p>
        <p>{`activePlayerId: ${room?.activeTurn.activePlayerId}`}</p>
        <p>{`activeTeamId: ${room?.activeTurn.activeTeamId}`}</p>
        <p>{`guessedPapelitos: ${room?.activeTurn.guessedPapelitos}`}</p>
        <p>{`timerCount: ${room?.activeTurn.timerCount}`}</p>
        <p>{`round: ${room?.round}`}</p>

        <pre style={{ display: 'flex', background: 'lightgray' }}>
          {JSON.stringify(room, null, 2)}
        </pre>
      </div>
    </div>
  )
}
