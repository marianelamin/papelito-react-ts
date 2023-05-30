import { PapDialog, PapInputText } from '../common'
import { useCallback, useState } from 'react'

interface JoinRoomDialogProps {
  close: () => void
  join: (playername: string, roomCode: string) => void
}
export const JoinRoomDialog = (props: JoinRoomDialogProps) => {
  const { close: handleClose, join: handleJoin } = props

  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false)
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [playerNameInput, setPlayerNameInput] = useState<string>('')

  const handlePrimaryButton = useCallback(() => {
    handleJoin(playerNameInput, roomCodeInput)
  }, [playerNameInput, roomCodeInput])

  const handleChangeRoomText = useCallback((event: any) => {
    setRoomCodeInput(event.target.value.trim())
  }, [])

  const handleChangePlayerText = useCallback((event: any) => {
    setPlayerNameInput(event.target.value.trim())
  }, [])

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
      <PapInputText
        id="roomCodeField"
        label="Room code"
        value={roomCodeInput}
        onValueChange={handleChangeRoomText}
      ></PapInputText>

      <br />
      <PapInputText
        id="playerNameField"
        label="Player name"
        value={playerNameInput}
        onValueChange={handleChangePlayerText}
      ></PapInputText>
    </PapDialog>
  )
}