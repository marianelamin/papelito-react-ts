import { PapButton } from './common'
import { PapCard } from './common/pap-card'
import { useBowl } from '../../modules/room/features/game/hook'

export const PapelitoDisplayForGuessing = (): JSX.Element => {
  const { disputePapelito: handleDispute, drawnPapelito } = useBowl()

  return (
    <PapCard
      subTitle={'Adivina el papelito'}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton onClick={handleDispute} disabled={!drawnPapelito} label="Dispute" />
        </div>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h1>?</h1>
      </div>
    </PapCard>
  )
}

export const PapelitoDisplayForExplaining = (): JSX.Element => {
  const {
    availableToDraw,
    drawnPapelito,
    drawPapelito: handleDraw,
    markAsGuessed: handleGuess
  } = useBowl()

  return (
    <PapCard
      subTitle={'Explica el papelito'}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <PapButton
            onClick={handleDraw}
            disabled={!!drawnPapelito || availableToDraw.length === 0}
            label="Draw"
          />
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
