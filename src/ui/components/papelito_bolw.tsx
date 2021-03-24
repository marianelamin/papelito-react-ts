import react, { useState } from 'react'
import { Papelito } from '../models/all_models'

// ---------------------------

interface PapelitoBowlIO {
  bowlSize: number
  papelitoList?: Papelito[]
  papelitoShown: Papelito | undefined
  papelitoDrawn: Function
  papelitoGuessed: Function
}

export const PapelitoBowl = (props: PapelitoBowlIO) => {
  const [showPapelito, setShowPapelito] = useState<boolean>(false)
  //   const [papelitoShown, setPapelitoShown] = useState<Papelito | undefined>(
  // undefined
  //   )

  const drawPapelito = () => {
    props.papelitoDrawn()
    // if (props.bowlSize > 0) {
    //   setShowPapelito(true)
    //   return setPapelitoShown(props.papelitoDrawn())
    // }
    // return null
  }

  const guessPapelito = () => {
    if (props.papelitoShown !== undefined) {
      setShowPapelito(false)
      var p = Papelito.fromAnotherPapelito(props.papelitoShown)
      console.log(`papelito set to guessed:`)
      console.log(p)
      //   setPapelitoShown(undefined)
      return props.papelitoGuessed(p)
    }
  }

  const bowlSize = () => props.bowlSize
  const hasPapelitoBeenDrawn = () => {
    return props.papelitoShown !== undefined
  }

  const disableDraw = () => bowlSize() === 0
  const disableGuess = () => bowlSize() === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <h2>Bowl</h2> <span>total: {bowlSize()}</span>
      <div>
        <PapelitoDisplay papelito={props.papelitoShown}></PapelitoDisplay>
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

// ---------------------------

interface PapelitoDisplayIO {
  papelito: Papelito | undefined
  showPapelito?: boolean // prob no going to be used
}

const PapelitoDisplay = (props: PapelitoDisplayIO) => {
  return props.papelito !== undefined ? (
    <div>
      <p>{props.papelito.text}</p>
      <span>[{props.papelito.id}] - </span>
      <span>({props.papelito.guessed ? 'true' : 'false'})</span>
    </div>
  ) : (
    <div>nothing to show yet</div>
  )
}
