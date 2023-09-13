import { Divider } from 'primereact/divider'
import { AddPapelitoComponent } from './add_papelito'
import { useCallback, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { Papelito } from 'papelito-models'
import { PapButton } from './common'
import { RootState, useAppDispatch } from '+redux/store'
import { useSelector } from 'react-redux'
import { papelitoSlice } from '+redux/feature/papelito/papelito_slice'
import { addToBowl } from '+redux/feature/bowl/bowl_slice'
import { useAlert } from 'utilities/context/globalAlertContext'
import { markPlayerSubmittedPapelitos } from '+redux/feature/player/player_slice'
import { usePlayer } from 'hooks'

const AddPapelitosComponent = () => {
  const appDispatch = useAppDispatch()
  const { roomId, currentPlayer } = usePlayer()
  const { notifySuccessAlert } = useAlert()

  const [isSendingToBowl, setIsSendingToBowl] = useState(false)
  const papelitos = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )

  const handleDeletePapelito = useCallback(
    (papelito: Papelito) => () => {
      appDispatch(papelitoSlice.actions.removeFromMyPapelitos(papelito.id))
    },
    [papelitoSlice.actions.removeFromMyPapelitos]
  )

  // no api calls, only on redux state
  const onSendToBowl = useCallback(async () => {
    setIsSendingToBowl(true)
    console.log({ currentPlayer })
    if (currentPlayer?.id) {
      await appDispatch(addToBowl(papelitos)).unwrap()
      await appDispatch(
        markPlayerSubmittedPapelitos({ roomId, playerId: currentPlayer?.id })
      ).unwrap()
      notifySuccessAlert({
        title: 'Papelitos added to bowl',
      })
      setIsSendingToBowl(false)
      appDispatch(papelitoSlice.actions.clearMyPapelitos())
    }
  }, [papelitos])

  const removePapelitoTemplate = (papelito: Papelito) => (
    <PapButton
      link
      severity={'secondary'}
      icon="pi pi-trash"
      tooltip="Remove"
      size={'small'}
      onClick={handleDeletePapelito(papelito)}
    ></PapButton>
  )

  return (
    <div className="flex gap-1 p-1">
      {currentPlayer?.hasSubmittedPapelitos ? (
        <p>You have submitted your papelitos</p>
      ) : (
        <div className="flex gap-3">
          <AddPapelitoComponent />
          <DataTable value={papelitos}>
            <Column field="text" />
            <Column field="remove" body={removePapelitoTemplate} />
          </DataTable>
          <PapButton
            tooltip="Put in Bowl"
            className="align-items-center"
            disabled={papelitos.length < 3}
            icon="pi pi-send"
            loading={isSendingToBowl}
            onClick={onSendToBowl}
          />
        </div>
      )}
    </div>
  )
}

export { AddPapelitosComponent as PapelitosComponent }
