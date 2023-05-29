import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '+redux/store'
import { PapDialog } from '../common'
import { Room } from 'papelito-models'

interface RoomDetailsDialogProps {
  close: () => void
}

export const RoomDetailsDialog = (props: RoomDetailsDialogProps) => {
  const { close } = props
  const room = useSelector<RootState, Room | undefined>(
    (state) => state.room.room
  )

  return (
    <PapDialog
      headerLabel={'Room Details'}
      visible
      primaryButtonLabel={'Save'}
      onPrimaryButton={(data: any) => {
        console.log('primarybutton has been pressed')
        console.log('data comming back', data)
        setTimeout(() => {
          close()
        }, 2000)
      }}
      onSecondaryButton={(data: any) => {
        console.log('secondaryButton has been pressed')
        console.log('data comming back', data)
        close()
      }}
      onVisibleChange={() => close()}
    >
      <div style={{ display: 'flex', background: 'lightgray' }}>
        <div>
          <p>Room Details: </p>
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>
      </div>
    </PapDialog>
  )
}
