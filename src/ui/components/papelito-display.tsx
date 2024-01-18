import { useCallback, useState } from 'react'
import { PapButton } from './common'
import { PapCard } from './common/pap-card'
import { type Papelito } from '../../models'

interface PapelitoDisplayForGuessingProps {
  disputePapelito: () => void
}

export const PapelitoDisplayForGuessing = ({
  disputePapelito
}: PapelitoDisplayForGuessingProps): JSX.Element => {
  const [isDisputeDisabled, setIsDisputeDisabled] = useState<boolean>(false)

  const handleDispute = useCallback(async () => {
    setIsDisputeDisabled(true)
    await disputePapelito()
    setIsDisputeDisabled(false)
  }, [disputePapelito])

  return (
    <PapCard
      subTitle={'Adivina el papelito'}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton onClick={handleDispute} disabled={isDisputeDisabled} label="Dispute" />
        </div>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h1>?</h1>
      </div>
    </PapCard>
  )
}

interface PapelitoDisplayForExplainingProps {
  drawnPapelito?: Papelito
  markAsGuessed: () => void
  drawPapelito: () => void
}

export const PapelitoDisplayForExplaining = (
  props: PapelitoDisplayForExplainingProps
): JSX.Element => {
  const { drawnPapelito, markAsGuessed, drawPapelito } = props

  const handleDraw = useCallback(() => {
    drawPapelito()
  }, [])

  const handleGuess = useCallback(() => {
    markAsGuessed()
  }, [])

  return (
    <PapCard
      subTitle={'Explica el papelito'}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton onClick={handleDraw} disabled={!!drawnPapelito} label="Draw" />
          <PapButton
            onClick={handleGuess}
            disabled={drawnPapelito?.guessed ?? true}
            label="Guessed"
          />
        </div>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {drawnPapelito ? (
          <h1>{drawnPapelito.text}</h1>
        ) : (
          <>
            <p>Draw a papelito</p>
          </>
        )}
      </div>
    </PapCard>
  )
}
