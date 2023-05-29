import { useSelector } from 'react-redux'

import { RootState } from '+redux/store'
import { Papelito } from 'papelito-models'
import { AddPapelitoComponent } from './add_papelito'
import { PapelitoListComponent } from './papelito_list'

const PapelitosComponent = () => {
  // add papelitos stuff
  const myPapelitoList = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )

  const saveNewPapelito = (papelitoToSave: Papelito) => {
    // if (currentPlayer) papelitoToSave.author = currentPlayer
    // console.log(papelitoToSave)
    // appDispatch(
    //   papelitoSlice.papelitoSlice.actions.addToMyPapelitos(papelitoToSave)
    // )
  }

  // no api calls, only on redux state
  function deletePapelito(papelitoToRemove: Papelito) {
    // appDispatch(
    //   papelitoSlice.papelitoSlice.actions.removeFromMyPapelitos(
    //     papelitoToRemove.id
    //   )
    // )
  }

  // this one will get papelitos written but not in bown yet, once they are in bowl owner ca no longer delete or edit.
  const throwPapelitoInBowl = async (papelitoToBowl: Papelito) => {
    console.log('sending', papelitoToBowl)
    // await appDispatch(bowlSlice.addToBowl(papelitoToBowl))

    // @TODO: I should clear my papelitos only after they have
    // been successfully added to the bowl
    // appDispatch(papelitoSlice.papelitoSlice.actions.clearMyPapelitos())
  }

  return (
    <div>
      <h1>My Papelitos</h1>
      <PapelitoListComponent
        papelitoList={myPapelitoList}
        onDeleteItem={deletePapelito}
        onSendToBowl={throwPapelitoInBowl}
      ></PapelitoListComponent>

      <AddPapelitoComponent
        onSavePapelito={saveNewPapelito}
      ></AddPapelitoComponent>
    </div>
  )
}

export { PapelitosComponent }
