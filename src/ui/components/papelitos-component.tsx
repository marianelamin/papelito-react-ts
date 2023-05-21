import { Papelito } from 'papelito-models'
import { AddPapelitoComponent } from './add_papelito'
import { PapelitoListComponent } from './papelito_list'

interface PapelitosComponentIO {
  papelitoList: Papelito[]
  onDeleteItem: Function
  onSendToBowl: (item: Papelito) => void
  onSavePapelito: Function
}

const PapelitosComponent = (props: PapelitosComponentIO) => {
  const { papelitoList, onDeleteItem, onSendToBowl, onSavePapelito } = props

  return (
    <div>
      <h1>My Papelitos</h1>
      <PapelitoListComponent
        papelitoList={papelitoList}
        onDeleteItem={onDeleteItem}
        onSendToBowl={onSendToBowl}
      ></PapelitoListComponent>

      <AddPapelitoComponent
        onSavePapelito={onSavePapelito}
      ></AddPapelitoComponent>
    </div>
  )
}

export { PapelitosComponent }
