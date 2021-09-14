import react, { useState } from 'react'
import { Button } from 'ui/styles'
import { Papelito } from 'ui/models/all_models'
import { TicTacToe } from 'ui/views/tictactoe'

interface AddPapelitoComponentIO {
  onSavePapelito: Function
}

export const AddPapelitoComponent = (props: AddPapelitoComponentIO) => {
  const HEADER_ADD_PAPELITO = 'Add a Papelito'
  const SAVE_PAPELITO = 'Save Papelito'
  const PAPELITO_LABEL = 'Papelito'

  const initialText: string = ''
  const [papelitoText, setPapelitoText] = useState<string>(initialText)

  const onChangeText = (event: any) => {
    setPapelitoText(event.target.value)
  }

  const savePapelito = () => {
    let generatedId = new Date().valueOf()
    if (papelitoText !== '')
      props.onSavePapelito(new Papelito(papelitoText, false, generatedId))
    setPapelitoText(initialText)
  }

  const onEnterSaveNewPapelito = (event: any) => {
    if (event.key === 'Enter') savePapelito()
  }

  const onClickSaveNewPapelito = () => {
    savePapelito()
  }

  return (
    <div>
      <h2>{HEADER_ADD_PAPELITO}</h2>
      <label>
        {PAPELITO_LABEL}:
        <input
          id="addPapelitoField"
          type="text"
          placeholder="Enter new papelito"
          value={papelitoText}
          onChange={onChangeText}
          onKeyDown={onEnterSaveNewPapelito}
        />
      </label>
      <Button onClick={onClickSaveNewPapelito}>{SAVE_PAPELITO}</Button>
    </div>
  )
}
