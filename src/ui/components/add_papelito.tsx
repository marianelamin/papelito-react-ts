import { useCallback, useState } from 'react'
import { GameSettings, Papelito, type Player } from '../../papelito-models'
import { PapButton, PapInputText } from './common'
import { type RootState, useAppDispatch } from '../../store-redux/store'
import { papelitoSlice } from '../../store-redux/feature/papelito/papelito_slice'
import { useSelector } from 'react-redux'

const AddPapelitoComponent = () => {
  const SAVE_PAPELITO = 'Add'
  const PAPELITO_LABEL = 'Text'

  const appDispatch = useAppDispatch()

  const initialText: string = ''
  const [papelitoText, setPapelitoText] = useState<string>(initialText)

  const papelitos = useSelector<RootState, Papelito[]>((state) => state.papelito.myPapelitos)

  const currentPlayer = useSelector<RootState, Player | undefined>(
    (state) => state.currentPlayer.player
  )

  const gameSettings = useSelector<RootState, GameSettings>(
    (state) => state.room.room?.settings ?? new GameSettings()
  )

  const addToList = useCallback(
    (text: string) => {
      const generatedId = new Date().valueOf()
      if (text !== '') {
        appDispatch(
          papelitoSlice.actions.addToMyPapelitos(
            new Papelito(generatedId + '', text, false, false, currentPlayer)
          )
        )
      }
      setPapelitoText(initialText)
    },
    [appDispatch, currentPlayer, papelitoSlice.actions.addToMyPapelitos]
  )

  const onChangeText = useCallback((event: any) => {
    setPapelitoText(event.target.value)
  }, [])

  const onEnterText = useCallback(
    (event: any) => event.key === 'Enter' && addToList(papelitoText),
    [addToList, papelitoText]
  )

  const onClickSaveNewPapelito = useCallback(() => {
    addToList(papelitoText)
  }, [addToList, papelitoText])

  return (
    <div className="flex gap-1 align-items-baseline">
      <PapInputText
        id="addPapelitoField"
        label={PAPELITO_LABEL}
        value={papelitoText}
        onValueChange={onChangeText}
        onKeyDown={onEnterText}
        disabled={
          currentPlayer?.hasSubmittedPapelitos ||
          papelitos.length === gameSettings.papelitoPerPlayer
        }
      />
      <PapButton
        link
        label={SAVE_PAPELITO}
        onClick={onClickSaveNewPapelito}
        disabled={papelitoText.length === 0}
      ></PapButton>
    </div>
  )
}

export { AddPapelitoComponent }
