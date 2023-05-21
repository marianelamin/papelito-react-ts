import react, { useState } from 'react'
import { Papelito } from '../../papelito-models'
import { PapelitoUnwrappedComponent } from './papelito-unwrapped-component'
import { PapButton, PapReactiveKnob } from './common'
import { PapelitoDisplayComponent } from '.'

// ---------------------------

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
  // console.log('bowlMax', bowlMax)
  // console.log('bowlSize', bowlSize)

  const [showPapelito, setShowPapelito] = useState<boolean>(false)

  const drawPapelito = () => {
    currentPapelitoDisplay && onDrawPapelito(currentPapelitoDisplay)
  }

  const guessPapelito = () => {
    if (currentPapelitoDisplay) {
      setShowPapelito(false)
      onGuessPapelito(currentPapelitoDisplay)
    }
  }

  const hasPapelitoBeenDrawn = () => !!currentPapelitoDisplay

  const disableDraw = () => bowlSize === 0
  const disableGuess = () => bowlSize === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <h2>Turn</h2>
      <PapReactiveKnob
        label="Bowl----"
        value={bowlSize}
        total={bowlMax}
      ></PapReactiveKnob>
      <div>
        {currentPapelitoDisplay && (
          <PapelitoDisplayComponent
            papelito={currentPapelitoDisplay}
            footerActions={
              <>
                <PapButton
                  onClick={drawPapelito}
                  disabled={disableDraw()}
                  label="Draw"
                ></PapButton>
                <PapButton
                  onClick={guessPapelito}
                  disabled={disableGuess()}
                  label="Guessed"
                ></PapButton>
              </>
            }
          ></PapelitoDisplayComponent>
        )}
      </div>
    </div>
  )
}

export { PapelitoBowlComponent }
