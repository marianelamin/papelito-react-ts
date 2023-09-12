import { PapDialog, PapInputText } from '../common'
import { useCallback, useState } from 'react'

interface CreateRoomDialogProps {
  close: () => void
  create: (playername: string) => Promise<void>
}
export const CreateRoomDialog = (props: CreateRoomDialogProps) => {
  const { close: handleClose, create: handleCreate } = props
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false)
  const [playerNameInput, setPlayerNameInput] = useState<string>('')
  const [displayBasic, setDisplayBasic] = useState(false)

  const handlePrimaryButton = useCallback(async () => {
    setPrimaryButtonLoading(true)
    await handleCreate(playerNameInput.trim())
    setPrimaryButtonLoading(false)
    handleClose()
  }, [playerNameInput])

  const handleChangePlayerText = useCallback((event: any) => {
    setPlayerNameInput(event.target.value)
  }, [])

  return (
    <PapDialog
      visible
      closable
      closeOnEscape
      headerLabel={'Create a Room'}
      primaryButtonLabel={'Create'}
      primaryButtonLoading={primaryButtonLoading}
      primaryButtonDisabled={playerNameInput.length === 0}
      showPrimaryButtonError={false}
      showPrimaryButtonErrorText="An error"
      onPrimaryButton={handlePrimaryButton}
      onVisibleChange={setDisplayBasic}
      onHideDialog={handleClose}
    >
      <div style={{ marginTop: '1rem' }}>
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
