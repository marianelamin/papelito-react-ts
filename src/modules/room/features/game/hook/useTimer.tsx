import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoom } from '../../../../../hooks'

interface PapelitoClock {
  countDown: number
  status: 'in-progress' | 'paused' | 'reset'
}

export type TimerStateType = 'in-progress' | 'paused' | 'reset' | 'finished'

export const DEFAULT_TIMER_START_COUNT = 2

export const useTimer = () => {
  const { room } = useRoom()

  const ref = useRef<NodeJS.Timeout>()

  const [timerState, setTimerState] = useState<TimerStateType>('reset')
  const [initialCountDown, setInitialCountDown] = useState<number>(DEFAULT_TIMER_START_COUNT)
  const [countDown, setCountDown] = useState<number>(initialCountDown)

  const startTimer = useCallback(() => {
    console.log('start timer', room?.id)
    console.log('entra en start timer', room?.id)
    setTimerState('in-progress')
  }, [room?.id])

  const pauseTimer = useCallback(() => {
    console.log('pauseTimer', room?.id)
    setTimerState('paused')
  }, [room?.id])

  const markTimesUp = useCallback(() => {
    console.log('markTimesUp', room?.id)
    setTimerState('finished')
  }, [room?.id])

  const resetTimer = useCallback(() => {
    console.log('resetTimer', room?.id)
    setTimerState('reset')
    setCountDown(DEFAULT_TIMER_START_COUNT)
  }, [room?.id])

  useEffect(() => {
    console.log(timerState)
    if (timerState === 'in-progress') {
      if (ref.current) clearInterval(ref.current)
      ref.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 0) return prev - 1
          markTimesUp()
          return 0
        })
      }, 1000)
      return () => clearInterval(ref.current)
    } else if (timerState === 'finished') {
      setTimeout(() => {
        resetTimer()
      }, 3000)
    } else return () => {}
  }, [timerState, markTimesUp])

  // useEffect(() => {
  //   console.info('-\n\nThis is custom Player hook\n\n\n-', `roomId: ${roomId}`)
  //   const unsubscribe = onSnapshot(
  //     // doc(db, 'gamePlayers', playerId),
  //     doc(playersRef(roomId)),
  //     (document) => {
  //       console.log(`Received doc snapshot: `, document)
  //       console.log(`Received doc snapshot: `, document.data())
  //       console.log(`Received doc snapshot: `, document.id)

  //       // let r = (document.data() as FirestorePlayer).toPlayer()
  //       // console.log(r instanceof Player)
  //       // console.log(r)
  //       // setPlayer(r)
  //       // setIsFetching(true)

  //       // let newPlayerRaw = { ...document.data(), id: document.id }
  //       // newPlayerRaw['id'] = playerId

  //       // console.log(newPlayerRaw)
  //       // if (document.exists) console.log(`here is the Player:  ${newPlayerRaw}`)
  //       // setPlayer(newPlayerRaw)
  //       // else console.log('Player Not Found')
  //       // if (isFetching) setIsFetching(false)
  //     },
  //     (error) => console.error('aqui esta el error pues: \n', error),
  //     () => {
  //       console.info('Finished!!!')
  //     }
  //   )

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [roomId, isFetching])

  return {
    timer: { countDown, state: timerState },
    startTimer,
    pauseTimer,
    resetTimer
  }
}
