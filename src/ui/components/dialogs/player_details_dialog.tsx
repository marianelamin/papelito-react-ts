import { useUser } from 'utilities/context/userContext'
import { PapDialog } from '../common'
import { usePlayer } from 'hooks'
import { useState } from 'react'

interface PlayerDetailsDialogProps {
  close: () => void
}
export const PlayerDetailsDialog = (props: PlayerDetailsDialogProps) => {
  const { close } = props
  const { roomId, userId } = useUser()

  const { currentPlayer } = usePlayer(roomId, userId)
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false)

  return (
    <PapDialog
      headerLabel="Player Details"
      visible
      primaryButtonLabel={'Save'}
      primaryButtonLoading={primaryButtonLoading}
      primaryButtonDisabled={false}
      onPrimaryButton={(data: any) => {
        console.log('data comming back', data)
        setPrimaryButtonLoading(true)
        setTimeout(() => {
          close()
          setPrimaryButtonLoading(false)
        }, 2000)
      }}
      onSecondaryButton={(data: any) => {
        console.log('data comming back', data)
        close()
      }}
      onVisibleChange={() => close()}
    >
      <p>
        Navigation with 2 dialogs showing user details and room details (copy
        room id to clipboard)
      </p>
      <div style={{ display: 'flex', background: 'lightgray' }}>
        <p>Player Details: </p>
        <pre>{JSON.stringify(currentPlayer, null, 2)}</pre>
      </div>
    </PapDialog>
  )
}
