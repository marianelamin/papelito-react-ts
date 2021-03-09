import react, { useState } from 'react'
import { Papelito } from '../models/papelito'
import { Button } from 'ui/styles'
import { TicTacToe } from 'ui/views/tictactoe'

interface AddPapelitoIO {
  onSavePapelito: Function
}

export const AddPapelito = (props: AddPapelitoIO) => {
  const HEADER_ADD_PAPELITO = 'Add a Papelito'
  const SAVE_PAPELITO = 'Save Papelito'
  const PAPELITO_LABEL = 'Papelito'

  const initialText: string = ''
  const [text, setText] = useState<string>(initialText)

  const onChangeText = (event: any) => {
    setText(event.target.value)
  }

  const savePapelito = () => {
    let generatedId = new Date().valueOf()
    if (text !== '')
      props.onSavePapelito(new Papelito(text, false, generatedId))
    setText(initialText)
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
          value={text}
          onChange={onChangeText}
          onKeyDown={onEnterSaveNewPapelito}
        />
      </label>
      <Button onClick={onClickSaveNewPapelito}>{SAVE_PAPELITO}</Button>
    </div>
  )
}
