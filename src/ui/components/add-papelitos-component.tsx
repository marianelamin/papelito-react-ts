import { AddPapelitoComponent } from './add-papelito'
import { useCallback, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { type Papelito, GameSettings } from '../../models'
import { PapButton } from './common'
import { RootState, useAppDispatch } from '../../store-redux/store'
import { useSelector } from 'react-redux'
import { papelitoSlice } from '../../store-redux/feature/papelito/papelito_slice'
import { addToBowl } from '../../store-redux/feature/bowl/bowl_slice'
import { useAlert } from '../../utilities/context/globalAlertContext'
import { markPlayerSubmittedPapelitos } from '../../store-redux/feature/player/player_slice'
import { usePlayer } from '../../hooks'

const DEFAULT_PAPELITOS_PER_PLAYER = 3

const AddPapelitosComponent = () => {
  const appDispatch = useAppDispatch()
  const { roomId, currentPlayer } = usePlayer()
  const { notifySuccessAlert } = useAlert()

  const [isSendingToBowl, setIsSendingToBowl] = useState(false)

  const settings = useSelector<RootState, GameSettings | undefined>(
    (state) => state.room.room?.settings
  )
  const papelitos = useSelector<RootState, Papelito[]>((state) => state.papelito.myPapelitos)

  const isSubmitDisabled = useMemo(
    () => papelitos?.length < (settings?.papelitoPerPlayer ?? DEFAULT_PAPELITOS_PER_PLAYER),
    [papelitos, settings]
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
    if (currentPlayer?.id) {
      await appDispatch(addToBowl(papelitos)).unwrap()
      await appDispatch(
        markPlayerSubmittedPapelitos({ roomId: roomId ?? '', playerId: currentPlayer?.id })
      ).unwrap()
      notifySuccessAlert({
        title: 'Papelitos added to bowl'
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
    <div className={'col-12'}>
      <div>
        <h3 className="text-center m-0">Submit Papelitos</h3>
      </div>
      <div className="gap-3 p-3">
        <div className="grid gap-3 p-3">
          <div className="md:col-6">
            <AddPapelitoComponent />
          </div>
          <div className="md:col-6 grid">
            <DataTable value={papelitos}>
              <Column field="text" />
              <Column field="remove" body={removePapelitoTemplate} />
            </DataTable>
            <PapButton
              tooltip="Put in Bowl"
              disabled={isSubmitDisabled}
              icon="pi pi-send"
              loading={isSendingToBowl}
              onClick={onSendToBowl}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { AddPapelitosComponent }
