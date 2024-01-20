import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoom } from '../../../../../hooks'
import { FirestorePapelitoClock } from '../../../../../models/firestore'
import * as fs from '../../../../../dao'
import { timerRef } from '../../../../../dao/collection_references'
import { addSeconds, differenceInSeconds } from 'date-fns'

export type TimerStateType = 'in-progress' | 'paused' | 'reset' | 'finished'

export const DEFAULT_TIMER_START_COUNT = 2

const getTimeAtWhichTurnMustEnd = (gap?: number) => {
  const now = addSeconds(new Date(), gap ?? 0)
  const now1 = addSeconds(new Date().getUTCDate(), gap ?? 0)
  const now2 = addSeconds(new Date(), gap ?? 0).toISOString()
  console.log({ now })
  console.log({ now1 })
  console.log({ now2 })
  return now2
}

export const useTimer = () => {
  const { room } = useRoom()

  const ref = useRef<NodeJS.Timeout>()

  const [isFetching, setIsFetching] = useState<boolean>(false)

  const [countDown, setCountDown] = useState<number>(room?.settings.timerTurn!) // how much time is left on the turn after pause

  const [timerState, setTimerState] = useState<TimerStateType>('reset')
  const [timeLeft, setTimeLeft] = useState<number>() // how much time is left on the turn after pause
  const [endOfTurn, setEndOfTurn] = useState<Date>() // the time UTC at which turn must finish

  const startTimer = useCallback(async () => {
    if (!room) return

    const state: TimerStateType = 'in-progress'
    const future = getTimeAtWhichTurnMustEnd(timeLeft)
    await fs.updateDoc(fs.doc(timerRef(room.id), 'timerId'), {
      end_of_turn: future,
      state: state
    })
  }, [room, timeLeft])

  const pauseTimer = useCallback(async () => {
    if (!room) return

    const state: TimerStateType = 'paused'
    const left = differenceInSeconds(endOfTurn!, new Date())
    setCountDown(left)
    await fs.updateDoc(fs.doc(timerRef(room.id), 'timerId'), {
      end_of_turn: null,
      time_left: left,
      state: state
    })
  }, [room, endOfTurn])

  const markTimesUp = useCallback(() => {
    const state: TimerStateType = 'finished'
    setTimerState(state)
  }, [])

  const resetTimer = useCallback(async () => {
    if (!room) return

    const state: TimerStateType = 'reset'
    await fs.updateDoc(fs.doc(timerRef(room.id), 'timerId'), {
      end_of_turn: null,
      time_left: room.settings.timerTurn,
      state: state
    })
  }, [room])

  useEffect(() => {
    if (timerState === 'in-progress') {
      if (ref.current) clearInterval(ref.current)
      ref.current = setInterval(() => {
        const countD = differenceInSeconds(endOfTurn!, new Date())
        if (countD < 0) {
          markTimesUp()
          return
        } else setCountDown(countD)
        console.log({ diff: countD })
      }, 200)
    } else {
      ref && clearInterval(ref.current)
    }

    if (timerState === 'finished') {
      const timeout = setTimeout(() => {
        resetTimer()
      }, 3000)
      return () => clearTimeout(timeout)
    }

    return () => ref && clearInterval(ref.current)
  }, [timerState])

  useEffect(() => {
    if (!room) return

    const unsubscribe = fs.onSnapshot(
      fs.doc(timerRef(room.id), 'timerId'),
      (document) => {
        if (document.exists()) {
          console.log(`Received doc data: `, document.data())

          let timer = document.data() as FirestorePapelitoClock
          console.log({ timer })

          setTimerState(timer.state)
          setTimeLeft(timer.time_left)
          setEndOfTurn(timer.end_of_turn)
          setCountDown(timer.time_left)
        } else console.log(`it does not exists`)
        if (isFetching) setIsFetching(false)
      },
      (error) => console.error('aqui esta el error pues: \n', error),
      () => {
        console.info('Finished!!!')
      }
    )

    return () => unsubscribe()
  }, [room?.id])

  return {
    timer: { countDown, state: timerState },
    startTimer,
    pauseTimer,
    resetTimer
  }
}
