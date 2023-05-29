import { RootState, useAppDispatch } from '+redux/store'
import { usePlayer } from 'hooks'
import { Papelito } from 'papelito-models'
import { Toolbar } from 'primereact/toolbar'
import { useSelector } from 'react-redux'
import { PapelitosComponent } from 'ui/components'
import { PapChart, PapSideBar } from 'ui/components/common'

export const ToolbarContainer = (): JSX.Element => {
  const appDispatch = useAppDispatch()

  // toolbar stuff

  // stats stuff

  // add papelitos stuff
  const myPapelitoList = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )
  /**
   * arrow functions
   */
  // no api calls, only on redux state

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
    <Toolbar
      left={<h1>Room</h1>}
      right={
        <>
          <PapSideBar icon="pi-chart-bar" btnLabel="Stats">
            <h1>Stats</h1>

            {/* @todo: pass teams down as a prop */}
            <PapChart></PapChart>
            <ol>
              <li>adf</li>
              <li>adf</li>
            </ol>

            <h3>Current Team</h3>
          </PapSideBar>

          <div style={{ display: 'inline-block', padding: '1rem' }}></div>
          <PapSideBar icon="pi-user" btnLabel="Papelitos" position="right">
            <PapelitosComponent
              papelitoList={myPapelitoList}
              onDeleteItem={deletePapelito}
              onSendToBowl={throwPapelitoInBowl}
              onSavePapelito={saveNewPapelito}
            ></PapelitosComponent>
          </PapSideBar>
        </>
      }
    ></Toolbar>
  )
}
