import { useState } from 'react'
import { Papelito } from '../../papelito-models'
import { PapReactiveKnob } from './common'
import { PapelitoDisplayForGuessing } from './papelito_display_guessing'

interface PapelitoBowlComponentIO {
  bowlSize: number
  bowlMax: number
  currentPapelitoDisplay?: Papelito
  onDrawPapelito: (p: Papelito) => void
  onGuessPapelito: (p: Papelito) => void
}

const PapelitoBowlComponent = (props: PapelitoBowlComponentIO) => {
  const {
    bowlSize,
    bowlMax,
    currentPapelitoDisplay,
    onDrawPapelito,
    onGuessPapelito,
  } = props

  const [showPapelito, setShowPapelito] = useState<boolean>(false)

  // use papelito game
  // const [game, setGame] = usePapelitoGame(false)

  const hasPapelitoBeenDrawn = () => !!currentPapelitoDisplay
  const disableDraw = () => bowlSize === 0
  const disableGuess = () => bowlSize === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <div>{`Le toca a: <INSERTE NOMBRE DEL EXPLICADOR jajaja>`}</div>
      <PapReactiveKnob
        label="Bowl----"
        value={bowlSize}
        total={bowlMax}
      ></PapReactiveKnob>
      <hr />
      <div>{currentPapelitoDisplay && <PapelitoDisplayForGuessing />}</div>
      <hr />
    </div>
  )
}

export { PapelitoBowlComponent }
