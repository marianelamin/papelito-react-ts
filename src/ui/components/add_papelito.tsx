import { useState } from 'react'
import { Papelito, Player } from 'papelito-models'
import { PapButton, PapInputText } from './common'

interface AddPapelitoComponentIO {
  onSavePapelito: Function
}

const AddPapelitoComponent = (props: AddPapelitoComponentIO) => {
  const { onSavePapelito } = props
  const HEADER_ADD_PAPELITO = 'Add a Papelito'
  const SAVE_PAPELITO = 'Save Papelito'
  const PAPELITO_LABEL = 'Papelito'

  const initialText: string = ''
  const [papelitoText, setPapelitoText] = useState<string>(initialText)
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  )

  const savePapelito = () => {
    let generatedId = new Date().valueOf()
    let newPap
    if (papelitoText !== '')
      newPap = new Papelito(
        generatedId + '',
        papelitoText,
        false,
        false,
        currentPlayer
      )
    onSavePapelito(newPap)
    setPapelitoText(initialText)
  }

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
      <h2>{HEADER_ADD_PAPELITO}</h2>

      <PapInputText
        id="addPapelitoField"
        label={PAPELITO_LABEL}
        value={papelitoText}
        onValueChange={onChangeText}
        onKeyDown={onEnterText}
      ></PapInputText>
      {/* <input
          id=
          type="text"
          placeholder="Enter new papelito"
          value={papelitoText}
          onChange={onChangeText}
          onKeyDown={onEnterText}
        />
      </label> */}
      <PapButton
        icon="pi pi-save"
        label={SAVE_PAPELITO}
        onClick={onClickSaveNewPapelito}
      ></PapButton>
    </div>
  )
}

export { AddPapelitoComponent }
