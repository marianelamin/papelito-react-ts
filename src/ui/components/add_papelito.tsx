import { useCallback, useState } from 'react'
import { Papelito, Player } from 'papelito-models'
import { PapButton, PapInputText, PapTypography } from './common'
import { RootState, useAppDispatch } from '+redux/store'
import { papelitoSlice } from '+redux/feature/papelito/papelito_slice'
import { useSelector } from 'react-redux'

const AddPapelitoComponent = () => {
  const SAVE_PAPELITO = 'Add'
  const PAPELITO_LABEL = 'Text'

  const appDispatch = useAppDispatch()

  const initialText: string = ''
  const [papelitoText, setPapelitoText] = useState<string>(initialText)

  const papelitos = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )

  const currentPlayer = useSelector<RootState, Player | undefined>(
    (state) => state.currentPlayer.player
  )

  const addToList = useCallback(
    (text: string) => {
      let generatedId = new Date().valueOf()
      let newPap
      if (text !== '') {
        newPap = new Papelito(
          generatedId + '',
          text,
          false,
          false,
          currentPlayer
        )

        appDispatch(papelitoSlice.actions.addToMyPapelitos(newPap))
      }
      setPapelitoText(initialText)
    },
    [appDispatch, currentPlayer, papelitoSlice.actions.addToMyPapelitos]
  )

  const onChangeText = (event: any) => {
    setPapelitoText(event.target.value)
  }

  const onEnterText = useCallback(
    (event: any) => event.key === 'Enter' && addToList(papelitoText),
    [addToList, papelitoText]
  )

  const onClickSaveNewPapelito = useCallback(
    () => addToList(papelitoText),
    [addToList, papelitoText]
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
      }}
    >
      <PapInputText
        id="addPapelitoField"
        label={PAPELITO_LABEL}
        value={papelitoText}
        onValueChange={onChangeText}
        onKeyDown={onEnterText}
        disabled={
          currentPlayer?.hasSubmittedPapelitos || papelitos.length === 3
        }
      ></PapInputText>
      <PapButton
        label={SAVE_PAPELITO}
        onClick={onClickSaveNewPapelito}
        disabled={papelitoText.length === 0}
      ></PapButton>
    </div>
  )
}

export { AddPapelitoComponent }
