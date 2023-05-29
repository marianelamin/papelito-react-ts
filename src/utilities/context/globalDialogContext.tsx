import { FC, createContext, useCallback, useContext, useState } from 'react'
import { PlayerDetailsDialog } from 'ui/components/dialogs/player_details_dialog'
import { RoomDetailsDialog } from 'ui/components/dialogs/room_details_dialog'

export const PLAYER_DETAILS_DIALOG = 'PLAYER_DETAILS_DIALOG'
export const ROOM_DETAILS_DIALOG = 'ROOM_DETAILS_DIALOG'

// export type DialogComponents = keyof typeof DIALOG_COMPONENTS

export interface GlobalDialogStore {
  dialogType: string
  dialogProps?: { [key: string]: unknown }
}

export interface GlobalDialogContextParams {
  showModal: (
    dialogType: GlobalDialogStore['dialogType'],
    dialogProps?: GlobalDialogStore['dialogProps']
  ) => void
  hideModal: () => void
  currentDialog: GlobalDialogStore
}
const initialState: GlobalDialogContextParams = {
  showModal: () => {},
  hideModal: () => {},
  currentDialog: { dialogType: '' },
}

export const GlobalDialogContext = createContext<
  GlobalDialogContextParams | undefined
>(undefined)

export const useGlobalDialog = (): GlobalDialogContextParams => {
  const context = useContext(GlobalDialogContext)
  if (!context)
    throw new Error(
      'useGlobalDialogContext must be used within GlobalDialogProvider'
    )
  return context
}

export const GlobalDialogContextProvider: FC = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState<GlobalDialogStore>(
    initialState.currentDialog
  )
  const { dialogType, dialogProps } = currentDialog

  const DIALOG_COMPONENTS: { [key: string]: (...props: any) => JSX.Element } = {
    PLAYER_DETAILS_DIALOG: PlayerDetailsDialog,
    ROOM_DETAILS_DIALOG: RoomDetailsDialog,
  }

  const showModal: GlobalDialogContextParams['showModal'] = useCallback(
    (dialogType, dialogProps = {}) => {
      setCurrentDialog({ ...currentDialog, dialogType, dialogProps })
    },
    [currentDialog]
  )
  const hideModal: GlobalDialogContextParams['hideModal'] = useCallback(() => {
    setCurrentDialog({ ...currentDialog, dialogType: '', dialogProps: {} })
  }, [currentDialog])

  const renderDialogComponent = (): JSX.Element | null => {
    const DialogComponent = DIALOG_COMPONENTS[dialogType]
    return dialogType ? <DialogComponent {...dialogProps} /> : null
  }

  return (
    <GlobalDialogContext.Provider
      value={{ currentDialog, showModal, hideModal }}
    >
      {renderDialogComponent()}
      {children}
    </GlobalDialogContext.Provider>
  )
}
