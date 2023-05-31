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

const PapelitoListComponent = (): JSX.Element => {
  const appDispatch = useAppDispatch()
  const { notifySuccessAlert } = useAlert()

  const handleDeletePapelito = useCallback(
    (papelito: Papelito) => () => {
      appDispatch(papelitoSlice.actions.removeFromMyPapelitos(papelito.id))
    },
    [papelitoSlice.actions.removeFromMyPapelitos]
  )

  // no api calls, only on redux state
  const onSendToBowl = useCallback(async (items: Papelito[]) => {
    await appDispatch(addToBowl(items)).unwrap()
    notifySuccessAlert({
      title: 'Papelitos added to bowl',
    })
    appDispatch(papelitoSlice.actions.clearMyPapelitos())
  }, [])

  const papelitos = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )

  const removePapelitoTemplate = (papelito: Papelito) => (
    <PapButton
      icon="pi pi-trash"
      tooltip="Remove"
      onClick={handleDeletePapelito(papelito)}
    ></PapButton>
  )

  return (
    <div>
      <div className="card">
        <DataTable value={papelitos}>
          <Column field="text" header="My list"></Column>
          <Column
            field="remove"
            header=""
            body={removePapelitoTemplate}
          ></Column>
        </DataTable>
        <br />
        <PapButton
          disabled={papelitos.length < 3}
          icon="pi pi-send"
          onClick={() => onSendToBowl(papelitos)}
        ></PapButton>
      </div>
    </div>
  )
}

export { PapelitoListComponent }
