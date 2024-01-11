import { usePlayer } from '../../../../hooks'
import { PapDialog } from '../../../../ui/components/common'

interface PlayerDetailsDialogProps {
  close: () => void
}
export const PlayerDetailsDialog = (props: PlayerDetailsDialogProps) => {
  const { close } = props
  const { currentPlayer } = usePlayer()

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
        <p>Name: {currentPlayer?.name}</p>
        <p>Team: {currentPlayer?.teamId}</p>
        <pre style={{ display: 'flex', background: 'lightgray' }}>
          {JSON.stringify(currentPlayer, null, 2)}
        </pre>
      </div>
    </PapDialog>
  )
}
