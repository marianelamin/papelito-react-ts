import react, { useState } from 'react'
import { Papelito } from '../../papelito-models'
import { PapelitoDisplayComponent } from './papelito_display'

// ---------------------------

interface PapelitoBowlComponentIO {
  papelitoList?: Papelito[]
  currentPapelitoDisplay?: Papelito | undefined
  bowlSize: number
  onDrawPapelito: Function
  onGuessPapelito: Function
}

const PapelitoBowlComponent = (props: PapelitoBowlComponentIO) => {
  const [showPapelito, setShowPapelito] = useState<boolean>(false)

  const drawPapelito = () => {
    props.onDrawPapelito()
  }

  const guessPapelito = () => {
    if (props.currentPapelitoDisplay !== undefined) {
      setShowPapelito(false)
      var p = Papelito.clone(props.currentPapelitoDisplay)
      console.log(`papelito set to guessed:`)
      console.log(p)
      return props.onGuessPapelito(p)
    }
  }

  const bowlSize = () => props.bowlSize
  const hasPapelitoBeenDrawn = () => props.currentPapelitoDisplay !== undefined

  const disableDraw = () => bowlSize() === 0
  const disableGuess = () => bowlSize() === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <h2>Bowl</h2> <span>total: {bowlSize()}</span>
      <div>
        <PapelitoDisplayComponent
          papelito={props.currentPapelitoDisplay}
        ></PapelitoDisplayComponent>
      </div>
      <button onClick={drawPapelito} disabled={disableDraw()}>
        Draw
      </button>
      <button onClick={guessPapelito} disabled={disableGuess()}>
        Guessed
      </button>
    </div>
  )
}

export { PapelitoBowlComponent }
