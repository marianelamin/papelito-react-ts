import { useState } from 'react'
import { PapButton } from './common'

enum TimerState {
  STARTED,
  PAUSED,
}

const getTimerStateName = (state: TimerState) =>
  state === TimerState.PAUSED ? 'PAUSED' : 'STARTED'

const getBtnLabel = (state: TimerState) =>
  state === TimerState.PAUSED ? 'Iniciar' : 'Pausar'

const getBtnIcon = (state: TimerState) =>
  state === TimerState.PAUSED ? (
    <i className="pi pi-play"></i>
  ) : (
    <i className="pi pi-pause"></i>
  )

export const Timer = () => {
  const [timerState, setTimerState] = useState(TimerState.PAUSED)
  const [timer, setTimer] = useState(60)

  const handleReset = () => {
    console.log('handle reset')
    setTimerState(TimerState.PAUSED)
  }

  const handlePlayPause = () => {
    setTimerState((prev) =>
      prev === TimerState.PAUSED ? TimerState.STARTED : TimerState.PAUSED
    )
  }

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px gray solid'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h3>
          <i className="pi pi-stopwatch" /> Cronometro
        </h3>
        <p>{timer} s</p>
        <p>{getTimerStateName(timerState)}</p>
      </div>

      <PapButton
        link
        icon={getBtnIcon(timerState)}
        label={getBtnLabel(timerState)}
        onClick={handlePlayPause}
      ></PapButton>
      <PapButton
        link
        icon={<i className="pi pi-replay"></i>}
        label={'Resetear'}
        onClick={handleReset}
      ></PapButton>
    </div>
  )
}
