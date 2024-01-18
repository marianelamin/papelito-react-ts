import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoom } from '../../../../../hooks'
import { FirestorePapelitoClock } from '../../../../../models/firestore'
import * as fs from '../../../../../dao'
import { timerRef } from '../../../../../dao/collection_references'

export type TimerStateType = 'in-progress' | 'paused' | 'reset' | 'finished'

export const DEFAULT_TIMER_START_COUNT = 2

export const useTimer = () => {
  const { room } = useRoom()

  const ref = useRef<NodeJS.Timeout>()

  const [isFetching, setIsFetching] = useState<boolean>(false)

  const [timerState, setTimerState] = useState<TimerStateType>('reset')
  const [initialCountDown, setInitialCountDown] = useState<number>(DEFAULT_TIMER_START_COUNT)
  const [countDown, setCountDown] = useState<number>(initialCountDown)

  const startTimer = useCallback(async () => {
    if (!room) return

    console.log('start timer', room?.id)
    console.log('entra en start timer', room?.id)
    setTimerState('in-progress')
  }, [room?.id])

  const pauseTimer = useCallback(async () => {
    if (!room) return

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
    setCountDown(initialCountDown)
  }, [room?.id, initialCountDown])

  useEffect(() => {
    const updateStore = async () => {
      if (room?.id)
        await fs.updateDoc(fs.doc(timerRef(room.id), 'timerId'), {
          count_down: countDown,
          state: timerState
        })
    }
    updateStore()

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
      const timeout = setTimeout(() => {
        resetTimer()
      }, 3000)
      return () => clearTimeout(timeout)
    } else return () => {}
  }, [timerState, markTimesUp])

  useEffect(() => {
    if (!room) return

    const unsubscribe = fs.onSnapshot(
      fs.doc(timerRef(room.id), 'timerId'),
      (document) => {
        if (document.exists()) console.log(`it exists`)
        else console.log(`it does not exists`)

        console.log(`Received doc: `, document)
        console.log(`Received doc data: `, document.data())
        console.log(`Received doc id: `, document.id)

        let timer = document.data() as FirestorePapelitoClock
        console.log({ timer })
        setTimerState(timer.state)
        setInitialCountDown(timer.count_down)

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
