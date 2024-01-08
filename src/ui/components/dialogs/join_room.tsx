import { PapDialog, PapInputText } from '../common'
import { useCallback, useState } from 'react'

interface JoinRoomDialogProps {
  close: () => void
  roomCode?: string
  join: (playername: string, roomCode: string) => Promise<void>
}
export const JoinRoomDialog = (props: JoinRoomDialogProps) => {
  const { close: handleClose, join: handleJoin, roomCode } = props

  const [fixedRoomCode] = useState(roomCode !== undefined)
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false)
  const [roomCodeInput, setRoomCodeInput] = useState<string>(roomCode ?? '')
  const [playerNameInput, setPlayerNameInput] = useState<string>('')

  const handlePrimaryButton = useCallback(async () => {
    setPrimaryButtonLoading(true)
    await handleJoin(playerNameInput.trim(), roomCodeInput.trim())
    setPrimaryButtonLoading(false)
    handleClose()
  }, [playerNameInput, roomCodeInput])

  const handleChangeRoomText = useCallback((event: any) => setRoomCodeInput(event.target.value), [])

  const handleChangePlayerText = useCallback(
    (event: any) => setPlayerNameInput(event.target.value),
    []
  )

  return (
    <PapDialog
      headerLabel="Join a Room"
      visible
      closable
      closeOnEscape
      primaryButtonLabel={'Join'}
      primaryButtonLoading={primaryButtonLoading}
      primaryButtonDisabled={
        roomCodeInput.trim().length === 0 || playerNameInput.trim().length === 0
      }
      onPrimaryButton={handlePrimaryButton}
      onVisibleChange={handleClose}
    >
      <div style={{ marginTop: '1rem' }}>
        <PapInputText
          id="roomCodeField"
          label="Room code"
          value={roomCodeInput}
          onValueChange={handleChangeRoomText}
          disabled={fixedRoomCode}
        ></PapInputText>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <PapInputText
          id="playerNameField"
          label="Player name"
          value={playerNameInput}
          onValueChange={handleChangePlayerText}
        ></PapInputText>
      </div>
    </PapDialog>
  )
}
