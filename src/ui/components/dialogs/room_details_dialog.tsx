import { PapDialog } from '../common'

interface RoomDetailsDialogProps {
  close: () => void
}

export const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { close } = props

  return (
    <PapDialog
      headerLabel={'Dialog Title'}
      visible
      closable
      closeOnEscape
      onVisibleChange={() => close()}
    ></PapDialog>
  )
}
