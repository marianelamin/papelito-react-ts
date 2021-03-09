import react, { useState } from 'react'
import { Papelito } from '../models/papelito'
import { Button } from 'ui/styles'

interface AddPapelitoIO {
  onSavePapelito: Function
}

export const AddPapelito = (props: AddPapelitoIO) => {
  const initialText: string = ''
  const [text, setText] = useState<string>(initialText)

  const onChangeText = (event: any) => {
    console.log(event.target.value)
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
      <h2>Mis Papelitos</h2>
      <label>
        Papelito:
        <input
          id="addPapelitoField"
          type="text"
          placeholder="Enter new papelito"
          value={text}
          onChange={onChangeText}
          onKeyDown={onEnterSaveNewPapelito}
        />
      </label>
      <Button onClick={onClickSaveNewPapelito}>Save Papelito</Button>
    </div>
  )
}
