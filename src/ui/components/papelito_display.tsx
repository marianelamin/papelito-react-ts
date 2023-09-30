import { useState } from 'react'
import { PapButton } from './common'
import { PapCard } from './common/pap-card'
import { Papelito } from 'papelito-models'

export const PapelitoDisplayForGuessing = (): JSX.Element => {
  const [isDisputeDisabled, setIsDisputeDisabled] = useState<boolean>(false)

  const handleDispute = () => {
    setIsDisputeDisabled(true)

    setIsDisputeDisabled(false)
  }

  return (
    <PapCard
      header={`Adivina el papelito`}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton
            onClick={handleDispute}
            disabled={isDisputeDisabled}
            label="Dispute"
          ></PapButton>
        </div>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h1>?</h1>
      </div>
    </PapCard>
  )
}

export const PapelitoDisplayForExplaining = (
  papelito: Papelito
): JSX.Element => {
  const [isDrawDisabled, setIsDrawDisabled] = useState<boolean>(false)
  const [isGuessDisabled, setIsGuessDisabled] = useState<boolean>(false)

  const handleDraw = () => {
    setIsDrawDisabled(true)
    setIsGuessDisabled(true)
    // todo: agarra proximo papelito
  }

  const handleGuess = () => {
    setIsGuessDisabled(true)

    // todo: marca el papelito como adivinado
    // await handleGuess(currentPapelitoDisplay)

    setIsGuessDisabled(false)
    setIsDrawDisabled(false)
  }

  return (
    <PapCard
      header={`Explica el papelito`}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton
            onClick={handleDraw}
            disabled={isDrawDisabled}
            label="Draw"
          ></PapButton>
          <PapButton
            onClick={handleGuess}
            disabled={isGuessDisabled}
            label="Guessed"
          ></PapButton>
        </div>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h1>{papelito.text}</h1>
      </div>
    </PapCard>
  )
}
