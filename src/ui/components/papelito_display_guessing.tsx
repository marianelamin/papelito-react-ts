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
        <>
          <PapButton
            onClick={handleDispute}
            disabled={isDisputeDisabled}
            label="Dispute"
          ></PapButton>
        </>
      }
    >
      ?
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
        <>
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
        </>
      }
    >
      {papelito.text}
    </PapCard>
  )
}
