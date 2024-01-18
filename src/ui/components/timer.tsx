import { useCallback, useEffect } from 'react'
import { PapButton } from './common'
import { useAlert } from '../../utilities/context'
import { TimerStateType, useTimer } from '../../modules/room/features/game/hook'

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

const getTimerStateName = (state: TimerStateType) => {
  switch (state) {
    case 'paused':
      return TimerStateConst.pauseStatus
    case 'in-progress':
      return TimerStateConst.startStatus
    case 'finished':
      return TimerStateConst.finishStatus
    default:
      return TimerStateConst.resetStatus
  }
}

// const getBtnTooltip = (state: TimerStateType) => {
//   switch (state) {
//     case 'reset':
//     case 'paused':
//     case 'finished':
//       return TimerStateConst.startTooltip
//     case 'in-progress':
//       return TimerStateConst.pauseTooltip
//     default:
//       return ''
//   }
// }

const getBtnIcon = (state: TimerStateType) => {
  switch (state) {
    case 'reset':
    case 'paused':
    case 'finished':
      return <i className="pi pi-play" />
    case 'in-progress':
      return <i className="pi pi-pause" />
    default:
      return null
  }
}

const prettifyCountDown = (countDown: number): string =>
  `00:${countDown < 10 ? '0' : ''}${countDown}`

export const Timer = () => {
  const {
    timer: { state: timerState, countDown },
    resetTimer: handleReset,
    startTimer,
    pauseTimer
  } = useTimer()
  const { notifyWarningAlert } = useAlert()

  const handlePlayPause = useCallback(() => {
    switch (timerState) {
      case 'reset':
      case 'paused':
        startTimer()
        break
      case 'in-progress':
        pauseTimer()
        break
      default:
        break
    }
  }, [timerState])

  useEffect(() => {
    if (timerState === 'finished') {
      notifyWarningAlert({
        title: 'Se acabo el tiempo'
      })
    }
  }, [timerState])

  return (
    <div className="">
      <div>
        <span className="flex-auto">
          <i className="pi pi-stopwatch mr-1" />
          {`${prettifyCountDown(countDown)}  [${getTimerStateName(timerState)}]`}
        </span>
      </div>
      <div className="flex justify-content-end">
        <PapButton link icon={getBtnIcon(timerState)} onClick={handlePlayPause} />
        <PapButton link icon={<i className="pi pi-replay"></i>} onClick={handleReset} />
      </div>
    </div>
  )
}
