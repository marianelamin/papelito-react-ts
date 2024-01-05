import { usePlayer } from '../../../hooks'
import { PapDialog } from '../common'

interface PlayerDetailsDialogProps {
  close: () => void
}
export const PlayerDetailsDialog = (props: PlayerDetailsDialogProps) => {
  const { close } = props
  const { currentPlayer: user } = usePlayer()

  return (
    <PapDialog
      headerLabel={'Player Details'}
      visible
      closable
      closeOnEscape
      onVisibleChange={() => {
        close()
      }}
    >
      <div className={'card'}>
        <p>Name: {user?.name}</p>
        <p>Team: {user?.teamId}</p>
        <pre style={{ display: 'flex', background: 'lightgray' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </PapDialog>
  )
}
