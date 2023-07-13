import { Divider } from 'primereact/divider'
import { AddPapelitoComponent } from './add_papelito'
import { useCallback } from 'react'
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

const PapelitosComponent = () => {
  const appDispatch = useAppDispatch()
  const { roomId, allPlayers, currentPlayer } = usePlayer()

  const { notifySuccessAlert } = useAlert()

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
    console.log({ currentPlayer })
    if (currentPlayer?.id) {
      await appDispatch(addToBowl(papelitos)).unwrap()
      await appDispatch(
        markPlayerSubmittedPapelitos({ roomId, playerId: currentPlayer?.id })
      ).unwrap()
      notifySuccessAlert({
        title: 'Papelitos added to bowl',
      })
      appDispatch(papelitoSlice.actions.clearMyPapelitos())
    }
  }, [papelitos])

  const removePapelitoTemplate = (papelito: Papelito) => (
    <PapButton
      severity={'secondary'}
      icon="pi pi-trash"
      tooltip="Remove"
      size={'small'}
      onClick={handleDeletePapelito(papelito)}
    ></PapButton>
  )

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        padding: '1rem',
      }}
    >
      {currentPlayer?.hasSubmittedPapelitos ? (
        <p>You have submitted your papelitos</p>
      ) : (
        <>
          <AddPapelitoComponent />

          <Divider layout="vertical" />

          <div style={{ display: 'flex' }}>
            <DataTable value={papelitos}>
              <Column field="text"></Column>
              <Column field="remove" body={removePapelitoTemplate}></Column>
            </DataTable>
            <Divider layout="vertical" />
            <PapButton
              style={{ alignSelf: 'baseline' }}
              disabled={papelitos.length < 3}
              icon="pi pi-send"
              onClick={onSendToBowl}
            ></PapButton>
          </div>
        </>
      )}
    </div>
  )
}

export { PapelitosComponent }
