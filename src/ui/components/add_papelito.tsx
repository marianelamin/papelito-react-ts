import { useCallback, useState } from 'react'
import { Papelito, Player } from 'papelito-models'
import { PapButton, PapInputText } from './common'
import { useAppDispatch } from '+redux/store'
import { papelitoSlice } from '+redux/feature/papelito/papelito_slice'

const AddPapelitoComponent = () => {
  const HEADER_ADD_PAPELITO = 'Add a Papelito'
  const SAVE_PAPELITO = 'Save Papelito'
  const PAPELITO_LABEL = 'Text'

  const appDispatch = useAppDispatch()

  const initialText: string = ''
  const [papelitoText, setPapelitoText] = useState<string>(initialText)
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  )
  const saveNewPapelito = (papelitoToSave: Papelito) => {
    // if (currentPlayer) papelitoToSave.author = currentPlayer
    // console.log(papelitoToSave)
    // appDispatch(
    //   papelitoSlice.papelitoSlice.actions.addToMyPapelitos(papelitoToSave)
    // )
  }

  const savePapelito = useCallback(() => {
    let generatedId = new Date().valueOf()
    let newPap
    if (papelitoText !== '') {
      newPap = new Papelito(
        generatedId + '',
        papelitoText,
        false,
        false,
        currentPlayer
      )

      appDispatch(papelitoSlice.actions.addToMyPapelitos(newPap))
    }
    setPapelitoText(initialText)
  }, [papelitoText, currentPlayer, papelitoSlice.actions.addToMyPapelitos])

  const onChangeText = (event: any) => {
    setPapelitoText(event.target.value)
  }

  const onEnterText = (event: any) => {
    if (event.key === 'Enter') savePapelito()
  }

  const onClickSaveNewPapelito = () => {
    savePapelito()
  }

  return (
    <div>
      <PapInputText
        id="addPapelitoField"
        label={PAPELITO_LABEL}
        value={papelitoText}
        onValueChange={onChangeText}
        onKeyDown={onEnterText}
      ></PapInputText>
      <br />
      <PapButton
        icon="pi pi-save"
        label={SAVE_PAPELITO}
        onClick={onClickSaveNewPapelito}
        disabled={papelitoText.length === 0}
      ></PapButton>
    </div>
  )
}

export { AddPapelitoComponent }
