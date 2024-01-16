import { useCallback, useEffect, useState } from 'react'
import { PapButton } from './common'
import { useAlert } from '../../utilities/context'

const TimerStateConst = {
  pauseTooltip: 'Pausar',
  pauseStatus: 'paused',
  startTooltip: 'Iniciar',
  startStatus: 'in progress',
  resetTooltip: 'Resetear',
  resetStatus: 'reset',
  finishTooltip: 'Iniciar',
  finishStatus: 'finished'
}

enum TimerState {
  STARTED,
  PAUSED,
  RESET,
  FINISHED
}

const getTimerStateName = (state: TimerState) => {
  switch (state) {
    case TimerState.PAUSED:
      return TimerStateConst.pauseStatus
    case TimerState.STARTED:
      return TimerStateConst.startStatus
    case TimerState.FINISHED:
      return TimerStateConst.finishStatus
    default:
      return TimerStateConst.resetStatus
  }
}

const getBtnTooltip = (state: TimerState) => {
  switch (state) {
    case TimerState.RESET:
    case TimerState.PAUSED:
    case TimerState.FINISHED:
      return TimerStateConst.startTooltip
    case TimerState.STARTED:
      return TimerStateConst.pauseTooltip
    default:
      return ''
  }
}

const getBtnIcon = (state: TimerState) => {
  switch (state) {
    case TimerState.RESET:
    case TimerState.PAUSED:
    case TimerState.FINISHED:
      return <i className="pi pi-play" />
    case TimerState.STARTED:
      return <i className="pi pi-pause" />
    default:
      return null
  }
}
const DEFAULT_TIMER_START_COUNT = 2

// interface TimerProps {
//   reset: () => void
//   start: () => void
//   pause: () => void
// }
// TODO: connect something to the Firebase, so timer starts going down for all at the same time.
// export const Timer = ({ reset, pause, start }: TimerProps) => {
export const Timer = () => {
  const { notifyInfoAlert } = useAlert()

  const [timerState, setTimerState] = useState(TimerState.PAUSED)
  const [countDown, setCountDown] = useState(DEFAULT_TIMER_START_COUNT)

  const handleReset = useCallback(() => {
    setTimerState(TimerState.RESET)
    setCountDown(DEFAULT_TIMER_START_COUNT)
  }, [])

  const handleTimeUp = useCallback(() => {
    setTimerState(TimerState.FINISHED)
    setTimeout(() => {
      handleReset()
      notifyInfoAlert({
        title: 'Temporaizador reseteado'
      })
    }, 3000)
  }, [handleReset, notifyInfoAlert])

  const handlePlayPause = useCallback(() => {
    switch (timerState) {
      case TimerState.RESET:
      case TimerState.PAUSED:
        setTimerState(TimerState.STARTED)
        break
      case TimerState.STARTED:
        setTimerState(TimerState.PAUSED)
        break
      default:
        break
    }
  }, [timerState])

  useEffect(() => {
    console.log(timerState, TimerState.STARTED)
    if (timerState === TimerState.STARTED) {
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 0) return prev - 1
          handleTimeUp()
          return 0
        })
      }, 1000)
      return () => clearInterval(interval)
    } else {
      return () => {}
    }
  }, [timerState, handleTimeUp])

  return (
    <div className="">
      <div>
        <span className="flex-auto">
          <i className="pi pi-stopwatch" />
          {` ${countDown} s  -  ${getTimerStateName(timerState)} `}
        </span>
      </div>
      <PapButton
        link
        icon={getBtnIcon(timerState)}
        tooltip={getBtnTooltip(timerState)}
        onClick={handlePlayPause}
      />
      <PapButton
        link
        icon={<i className="pi pi-replay"></i>}
        tooltip={'Resetear'}
        onClick={handleReset}
      />
    </div>
  )
}
